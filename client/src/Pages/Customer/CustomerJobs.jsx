import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import axiosInstance from "../../api/axios";
import TopNavbar from "../../Components/TopNavbar";
import Footer from "../../Components/Footer";

const CustomerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs from backend
  useEffect(() => {
    axiosInstance
      .get("/api/jobs")
      .then((res) => {
        // Handle new API response structure
        const jobsData = res.data.jobs || res.data;
        setJobs(jobsData);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // Filter jobs by search
  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div>
      <TopNavbar />
      <Container className="mt-15 pt-8">
        {/* Search Bar */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="🔍 Search Jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm"
            />
          </Col>
        </Row>

        {/* Most Recent Button */}
        <div className="d-flex gap-3 mb-4">
          <Row className="mb-4">
            <Col md={12}>
              <Button variant="outline-secondary" className="rounded-pill px-4">
                Most Recent
              </Button>
            </Col>
          </Row>

          {/* Best Match Button */}
          <Row className="mb-4">
            <Col md={12}>
              <Button variant="outline-secondary" className="rounded-pill px-4">
                Best Match
              </Button>
            </Col>
          </Row>
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="mb-3 shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <Card.Body>
                <Row>
                  <Col>
                    <h5 className="fw-semibold text-primary">{job.job_title}</h5>
                    <p className="text-muted mb-2">{job.job_description}</p>

                    <div className="d-flex align-items-center gap-3 text-secondary">
                      <span>
                        <FaMapMarkerAlt className="me-1" />
                        {job.job_location}
                      </span>
                      <span>
                        <FaRegCalendarAlt className="me-1" />
                        {new Date(job.job_posted_date).toLocaleDateString()}
                      </span>
                    </div>
                  </Col>

                  <Col md="auto" className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-decoration-none text-info fw-semibold"
                    >
                      →
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-muted">No jobs available.</p>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default CustomerJobs;
