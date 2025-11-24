import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Badge, InputGroup } from "react-bootstrap";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaBriefcase, FaSearch } from "react-icons/fa";
import axiosInstance from "../../api/axios";
import TopNavbar from "../../Components/TopNavbar";
import Footer from "../../Components/Footer";
import './CustomerJobs.css';

const CustomerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend
  useEffect(() => {
    axiosInstance
      .get("/api/jobs")
      .then((res) => {
        const jobsData = res.data.jobs || res.data;
        setJobs(jobsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  // Filter jobs by search
  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.job_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.job_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by most recent
  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.job_posted_date) - new Date(a.job_posted_date)
  );

  // Calculate days ago
  const getDaysAgo = (date) => {
    const diff = new Date() - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div>
      <div className="min-vh-100 d-flex flex-column bg-light">
        <TopNavbar />

        <Container className="my-4">
          {/* Search Bar */}
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup className="shadow-sm search-input-group">
                <InputGroup.Text className="bg-white border-0">
                  <FaSearch size={18} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by job title, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0"
                />
              </InputGroup>
            </Col>
          </Row>

          <hr className="my-4" />

          {/* Filter Badge */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <Button disabled variant="outline-dark" className="no-hover">
              <FaRegCalendarAlt className="me-2" />
              Most Recent
            </Button>
            {searchTerm && (
              <Badge bg="info" className="px-3 py-2">
                Searching: "{searchTerm}"
              </Badge>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading jobs...</p>
            </div>
          ) : sortedJobs.length === 0 ? (
            <Card className="border-0 shadow-sm text-center py-5">
              <Card.Body>
                <FaBriefcase size={60} className="text-muted mb-3" />
                <h4>No jobs found</h4>
                <p className="text-muted">
                  {searchTerm ? "Try adjusting your search terms" : "Check back later for new opportunities"}
                </p>
              </Card.Body>
            </Card>
          ) : (
            /* Jobs List */
            <div className="job-cards-container">
              {sortedJobs.map((job, index) => (
                <Card
                  key={job.job_id}
                  className="job-card mb-4 border-0 shadow-sm hover-lift"
                  style={{
                    animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                    cursor: 'pointer'
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className="mb-0 fw-bold theme-primary">{job.job_title}</h5>
                          <Badge bg="success" className="rounded-pill">
                            {job.job_status || 'Open'}
                          </Badge>
                        </div>
                        <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                          {job.job_description}
                        </p>
                      </div>
                    </div>

                    {/* Job Category Badge */}
                    <div className="mb-3">
                      <Badge bg="light" text="dark" className="px-3 py-2 me-2">
                        <FaBriefcase size={14} className="me-1" />
                        {job.job_category}
                      </Badge>
                    </div>

                    {/* Skills */}
                    {job.skills && (
                      <div className="mb-3 d-flex flex-wrap gap-2">
                        {job.skills.split(',').slice(0, 4).map((skill, idx) => (
                          <Badge
                            key={idx}
                            bg="secondary"
                            className="px-2 py-1 fw-normal"
                            style={{ fontSize: '0.85rem' }}
                          >
                            {skill.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Footer Info */}
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                      <div className="d-flex align-items-center gap-3 text-secondary small">
                        <span className="d-flex align-items-center">
                          <FaMapMarkerAlt size={16} className="me-1" />
                          {job.job_location}
                        </span>
                        <span className="d-flex align-items-center">
                          <FaRegCalendarAlt size={16} className="me-1" />
                          {getDaysAgo(job.job_posted_date)}
                        </span>
                      </div>
                      <Button
                        variant="info"
                        size="sm"
                        className="px-4 rounded-pill text-white"
                      >
                        View Details →
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerJobs;
