import React, { useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaRegCalendarAlt, FaBriefcase, FaUser, FaPhone, FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal, Container, Card, Badge, Row, Col } from "react-bootstrap";
import TopNavbar from "../../Components/TopNavbar";
import Footer from "../../Components/Footer";
import './WorkerViewJob.css';

export default function WorkerViewJob() {

    const navigate = useNavigate();

    const handleBackWorkerJob = () => {
        navigate("/workerjob");
    }

    const { state } = useLocation();
    const job = state;
    console.log("Job details:", job);

    const [show, setShow] = useState(false);

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
                    {/* Back Button */}
                    <Button
                        variant="link"
                        className="text-decoration-none text-dark mb-3 p-0 back-button"
                        onClick={handleBackWorkerJob}
                    >
                        <FaArrowLeft size={18} className="me-2" />
                        Back to Jobs
                    </Button>

                    {/* Main Job Details Card */}
                    <Card className="border-0 shadow-sm mb-4 job-detail-card">
                        <Card.Body className="p-4">
                            {/* Header with Title and Status */}
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="flex-grow-1">
                                    <h2 className="fw-bold theme-primary mb-3">{job.job_title}</h2>
                                    <div className="d-flex flex-wrap gap-3 text-secondary">
                                        <span className="d-flex align-items-center">
                                            <FaMapMarkerAlt size={16} className="me-2 theme-primary" />
                                            {job.job_location}
                                        </span>
                                        <span className="d-flex align-items-center">
                                            <FaRegCalendarAlt size={16} className="me-2 theme-primary" />
                                            Posted {getDaysAgo(job.job_posted_date)}
                                        </span>
                                        <span className="d-flex align-items-center">
                                            <FaBriefcase size={16} className="me-2 theme-primary" />
                                            {job.job_category}
                                        </span>
                                    </div>
                                </div>
                                <Badge bg="success" className="px-3 py-2 fs-6">
                                    {job.job_status || 'Open'}
                                </Badge>
                            </div>

                            <hr className="my-4" />

                            {/* Description Section */}
                            <div className="mb-4">
                                <h5 className="fw-bold mb-3 section-title">
                                    <span className="title-accent"></span>
                                    Job Description
                                </h5>
                                <p className="text-muted" style={{ textAlign: "justify", lineHeight: "1.8", fontSize: "1.05rem" }}>
                                    {job.job_description}
                                </p>
                            </div>

                            <hr className="my-4" />

                            {/* Skills Section */}
                            <div className="mb-4">
                                <h5 className="fw-bold mb-3 section-title">
                                    <span className="title-accent"></span>
                                    Required Skills
                                </h5>
                                <div className="d-flex flex-wrap gap-2">
                                    {job.skills && job.skills.split(',').map((skill, idx) => (
                                        <Badge
                                            key={idx}
                                            bg="light"
                                            text="dark"
                                            className="px-3 py-2 skill-badge"
                                            style={{ fontSize: '0.95rem' }}
                                        >
                                            {skill.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-4" />

                            {/* Contact Details Section */}
                            <div className="mb-4">
                                <h5 className="fw-bold mb-3 section-title">
                                    <span className="title-accent"></span>
                                    Contact Information
                                </h5>
                                <Row className="g-4">
                                    <Col md={4}>
                                        <div className="contact-item">
                                            <FaUser className="theme-primary mb-2" size={20} />
                                            <div className="small text-muted">Customer Name</div>
                                            <div className="fw-semibold">{job.customer_name}</div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="contact-item">
                                            <FaPhone className="theme-primary mb-2" size={20} />
                                            <div className="small text-muted">Phone Number</div>
                                            <div className="fw-semibold">{job.customer_phone}</div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="contact-item">
                                            <FaHome className="theme-primary mb-2" size={20} />
                                            <div className="small text-muted">Address</div>
                                            <div className="fw-semibold">{job.customer_address}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* Apply Button */}
                            <div className="text-center mt-5">
                                <Button
                                    onClick={() => setShow(true)}
                                    variant="info"
                                    size="lg"
                                    className="px-5 py-3 text-white apply-button"
                                >
                                    Apply for this Job
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Application Modal */}
                    <Modal show={show} onHide={() => setShow(false)} centered className="application-modal">
                        <Modal.Header closeButton className="border-0 pb-0">
                            <Modal.Title className="theme-primary fw-bold">Confirm Application</Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="text-center py-4">
                            <div className="mb-3">
                                <div className="confirmation-icon mb-3">
                                    <FaBriefcase size={40} className="theme-primary" />
                                </div>
                                <h5 className="mb-2">Apply for {job.job_title}?</h5>
                                <p className="text-muted">
                                    Your application will be sent to the employer. Make sure you're ready!
                                </p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="border-0 d-flex justify-content-center gap-3 pb-4">
                            <Button
                                variant="outline-secondary"
                                style={{ width: "140px" }}
                                onClick={() => setShow(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="info"
                                className="text-white"
                                style={{ width: "140px" }}
                            >
                                Confirm Apply
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            </div>
            <Footer />
        </div>
    )
}
