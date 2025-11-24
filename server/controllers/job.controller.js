const jobService = require('../services/job.service');
const prisma = require('../config/prisma');

class JobController {
  /**
   * Get all available jobs
   */
  async getAllJobs(req, res) {
    try {
      console.log(`[${new Date().toISOString()}] Fetching all jobs - User: ${req.user.email} (ID: ${req.user.userid})`);

      const jobs = await jobService.getAllJobs();

      console.log(`[${new Date().toISOString()}] Found ${jobs.length} jobs`);

      res.json({
        message: "Jobs fetched successfully",
        jobs
      });

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Get all jobs error:`, error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }

  /**
   * Create a new job posting
   */
  async createJob(req, res) {
    // Start a transaction for data consistency
    try {
      const {
        job_title,
        job_description,
        job_category,
        skills,
        job_location,
        customer_name,
        customer_address,
        customer_phone
      } = req.body;

      // Validation
      if (!job_title || !job_description || !job_category || !skills || !job_location) {
        return res.status(400).json({
          message: 'Required fields: job_title, job_description, job_category, skills, job_location'
        });
      }

      if (!customer_name || !customer_address || !customer_phone) {
        return res.status(400).json({
          message: 'Required fields: customer_name, customer_address, customer_phone'
        });
      }

      // Validate phone number
      const phoneNumber = parseInt(customer_phone);
      if (isNaN(phoneNumber)) {
        return res.status(400).json({
          message: 'Invalid phone number format'
        });
      }

      console.log(`[${new Date().toISOString()}] Creating job - User: ${req.user.email} (ID: ${req.user.userid})`);
      console.log(`[${new Date().toISOString()}] Job details: ${job_title} in ${job_location}`);

      // Use Prisma transaction for atomic operation
      const newJob = await prisma.$transaction(async (tx) => {
        return await tx.availableJobs.create({
          data: {
            job_title,
            job_description,
            job_category,
            skills,
            job_location,
            job_posted_date: new Date(),
            customer_name,
            customer_address,
            customer_phone: phoneNumber,
            job_status: 'open',
            submitted_user_email: req.user.email
          }
        });
      });

      console.log(`[${new Date().toISOString()}] Job created successfully - Job ID: ${newJob.job_id}`);

      res.status(201).json({
        message: "Job posted successfully",
        job: newJob
      });

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Create job error:`, error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }

  /**
   * Get jobs by current user
   */
  async getMyJobs(req, res) {
    try {
      console.log(`[${new Date().toISOString()}] Fetching jobs for user: ${req.user.email}`);

      const jobs = await jobService.getJobsByUserEmail(req.user.email);

      console.log(`[${new Date().toISOString()}] Found ${jobs.length} jobs for user ${req.user.email}`);

      res.json({
        message: "Jobs fetched successfully",
        jobs
      });

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Get my jobs error:`, error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }

  /**
   * Update job status
   */
  async updateJobStatus(req, res) {
    try {
      const { jobId } = req.params;
      const { status } = req.body;

      // Validation
      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }

      const validStatuses = ['open', 'in_progress', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      console.log(`[${new Date().toISOString()}] Updating job status - Job ID: ${jobId}, New status: ${status}`);

      // Use transaction for atomic update
      const updatedJob = await prisma.$transaction(async (tx) => {
        // Check if job exists
        const job = await tx.availableJobs.findUnique({
          where: { job_id: parseInt(jobId) }
        });

        if (!job) {
          throw new Error('Job not found');
        }

        // Update job status
        return await tx.availableJobs.update({
          where: { job_id: parseInt(jobId) },
          data: { job_status: status }
        });
      });

      console.log(`[${new Date().toISOString()}] Job status updated successfully - Job ID: ${jobId}`);

      res.json({
        message: "Job status updated successfully",
        job: updatedJob
      });

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Update job status error:`, error);

      if (error.message === 'Job not found') {
        return res.status(404).json({ message: error.message });
      }

      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }

  /**
   * Delete a job
   */
  async deleteJob(req, res) {
    try {
      const { jobId } = req.params;

      console.log(`[${new Date().toISOString()}] Deleting job - Job ID: ${jobId}, User: ${req.user.email}`);

      // Use transaction for atomic delete
      await prisma.$transaction(async (tx) => {
        // Check if job exists and belongs to user
        const job = await tx.availableJobs.findUnique({
          where: { job_id: parseInt(jobId) }
        });

        if (!job) {
          throw new Error('Job not found');
        }

        if (job.submitted_user_email !== req.user.email) {
          throw new Error('Unauthorized to delete this job');
        }

        // Delete the job
        await tx.availableJobs.delete({
          where: { job_id: parseInt(jobId) }
        });
      });

      console.log(`[${new Date().toISOString()}] Job deleted successfully - Job ID: ${jobId}`);

      res.json({
        message: "Job deleted successfully"
      });

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Delete job error:`, error);

      if (error.message === 'Job not found') {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === 'Unauthorized to delete this job') {
        return res.status(403).json({ message: error.message });
      }

      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }
}

module.exports = new JobController();
