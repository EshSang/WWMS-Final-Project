const prisma = require('../config/prisma');

class JobService {
  /**
   * Get all available jobs
   */
  async getAllJobs() {
    return await prisma.availableJobs.findMany({
      orderBy: {
        job_posted_date: 'desc'
      }
    });
  }

  /**
   * Get job by ID
   */
  async getJobById(jobId) {
    return await prisma.availableJobs.findUnique({
      where: { job_id: jobId }
    });
  }

  /**
   * Create a new job posting
   */
  async createJob(jobData) {
    return await prisma.availableJobs.create({
      data: jobData
    });
  }

  /**
   * Update job status
   */
  async updateJobStatus(jobId, status) {
    return await prisma.availableJobs.update({
      where: { job_id: jobId },
      data: { job_status: status }
    });
  }

  /**
   * Get jobs by user email
   */
  async getJobsByUserEmail(email) {
    return await prisma.availableJobs.findMany({
      where: { submitted_user_email: email },
      orderBy: {
        job_posted_date: 'desc'
      }
    });
  }

  /**
   * Delete a job
   */
  async deleteJob(jobId) {
    return await prisma.availableJobs.delete({
      where: { job_id: jobId }
    });
  }
}

module.exports = new JobService();
