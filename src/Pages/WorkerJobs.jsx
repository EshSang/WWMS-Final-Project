import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Navbar, Nav } from 'react-bootstrap';
import { GeoAlt, CalendarDate, PersonCircle, FileEarmarkPlus } from 'react-bootstrap-icons';

export default function WorkerJobs() {

    const jobs = [
        {
            id: 1,
            title: 'Need Plumber',
            description: 'I need a good plumber for fix my wash room tap',
            location: 'Maharagama',
            date: '02 March 2025',
        },
        {
            id: 2,
            title: 'Need Electrician',
            description: 'I need a good electrician for fix the current issue my shop',
            location: 'Galle',
            date: '05 March 2025',
        },
        {
            id: 3,
            title: 'Painter',
            description: 'I need a good painter for paint my house',
            location: 'Anuradhapura',
            date: '09 March 2025',
        },
    ];

    return (
        <div>
            <div className="min-vh-100 d-flex flex-column bg-light">
                {/* Navbar */}
                <Navbar bg="white" expand="lg" className="shadow-sm px-4">
                    {/* <Navbar.Brand href="#" className="fw-bold">
                        Jobs
                    </Navbar.Brand> */}
                    <Nav className="ms-4">
                        <Nav.Link className="fw-semibold">Jobs</Nav.Link>
                        <Nav.Link>My Services</Nav.Link>
                        <Nav.Link>Orders</Nav.Link>
                        <Nav.Link>Earning</Nav.Link>
                        <Nav.Link>Reviews</Nav.Link>
                        <Nav.Link>Analytics</Nav.Link>
                    </Nav>
                    {/* <div className="ms-auto d-flex align-items-center">
                        <PersonCircle size={24} className="me-2 text-secondary" />
                        <small>Hello, <strong>Eshana Sangeeth</strong></small>
                    </div> */}
                    <div className="ms-auto d-flex align-items-center">
                        <span className="me-2 small text-muted">Hello,</span>
                        <span className="fw-medium me-3">Eshana Sangeeth</span>
                        <img
                            src="/public/Profile.png"
                            alt="Profile"
                            className="rounded-circle border-2 border-primary"
                            width="40"
                            height="40"
                        />
                    </div>
                </Navbar>
            

            {/* Search bar */}
            <Container className="my-4">
                <InputGroup className="mb-3 mt-5" style={{width:"350px"}}>
                    <InputGroup.Text>
                        <i class="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Search Jobs" />
                </InputGroup>
                <hr className="mt-4 mb-4" />
                <Button variant="outline-dark" className="mb-3">
                    Most Recent
                </Button>

                {/* Job Cards */}
                <div>
                    {jobs.map((job) => (
                        <Card key={job.id} className="mb-3 border-0 shadow-sm">
                            <Card.Body className="d-flex justify-content-between align-items-center bg-light-subtle">
                                <div>
                                    <Card.Title className="fw-semibold">{job.title}</Card.Title>
                                    <Card.Text className="text-muted mb-2">{job.description}</Card.Text>
                                    <div className="d-flex align-items-center text-secondary small">
                                        <GeoAlt size={14} className="me-1" />
                                        {job.location}
                                        <CalendarDate size={14} className="ms-3 me-1" />
                                        {job.date}
                                    </div>
                                </div>
                                <FileEarmarkPlus size={30} className="text-info" />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
            </div>
        </div>
    )
}
