import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopNavbar() {

    
    return (
        <div>
            <Navbar bg="white" expand="lg" className="shadow-sm px-4 position-fixed w-100" style={{ zIndex: 1000 }}>
                <Container fluid>
                    {/* Toggle button for mobile */}
                    <Navbar.Toggle aria-controls="worker-navbar" />

                    {/* Collapsible content */}
                    <Navbar.Collapse id="worker-navbar">
                        {/* Nav links */}
                        <Nav className="me-auto ms-2">
                            {/* <Nav.Link as={Link} to="/workerjob" className="fw-semibold">
                            Jobs
                            </Nav.Link> */}


                            <Nav.Link
                                as={Link}
                                to="/workerjob"
                                className={`fw-semibold ${location.pathname === "/workerjob" ? "text-info border-bottom border-info" : "text-dark"
                                    }`}
                            >
                                Jobs
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/workermyservice"
                                className={`fw-semibold ${location.pathname === "/workermyservice" ? "text-info border-bottom border-info" : "text-dark"
                                    }`}
                            >
                                My Services
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/workerorders"
                                className={`fw-semibold ${location.pathname === "/workerorders" ? "text-info border-bottom border-info" : "text-dark"
                                    }`}
                            >
                                Orders
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/workerearning"
                                className={`fw-semibold ${location.pathname === "/workerearning" ? "text-info border-bottom border-info" : "text-dark"
                                    }`}
                            >
                                Earning
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/workerreviews"
                                className={`fw-semibold ${location.pathname === "/workerreviews" ? "text-info border-bottom border-info" : "text-dark"
                                    }`}
                            >
                                Reviews
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/workeranalytics"
                                className={`fw-semibold ${location.pathname === "/workeranalytics" ? "text-info border-bottom border-info" : "text-dark"
                                    }`}
                            >
                                Analytics
                            </Nav.Link>
                        </Nav>

                        {/* Profile Section */}
                        <div className="ms-auto d-flex align-items-center mt-2 mt-lg-0">
                            <span className="me-2 small text-muted">Hello,</span>
                            <span className="fw-medium me-3">Eshana Sangeeth</span>
                            <img
                                src="/Profile.png"
                                alt="Profile"
                                className="rounded-circle border border-info"
                                width="40"
                                height="40"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
