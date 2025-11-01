import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function TopNavbar() {

    const location = useLocation();
    const { selectedType } = location.state || {}; // Access passed value
    

    console.log("Selected Type in Navbar:", selectedType);

    // Example: You can set this from your login logic
    // (e.g., localStorage.getItem("role") or context API)

    //const userRole = localStorage.getItem("role"); // "worker" or "customer"

    const userRole = selectedType ; // For demonstration, set role here

    // Worker navigation links
    const workerLinks = [
        { path: "/workerjob", label: "Jobs" },
        { path: "/workermyservice", label: "My Services" },
        { path: "/workerorders", label: "Orders" },
        { path: "/workerearning", label: "Earning" },
        { path: "/workerreviews", label: "Reviews" },
        { path: "/workeranalytics", label: "Analytics" },
    ];

    // Customer navigation links
    const customerLinks = [
        { path: "/customerjobs", label: "Jobs" },
        { path: "/customerjobpost", label: "Job Post" },
        { path: "/customerorders", label: "Orders" },
        { path: "/customerpostedjobs", label: "Posted Jobs" },
        { path: "/customerreviews", label: "Reviews" },
        { path: "/customeranalytics", label: "Analytics" },
    ];

    // Choose links based on role
    const navLinks = userRole == "Worker" ? workerLinks : customerLinks;

    return (
        <div>
            <Navbar
                bg="white"
                expand="lg"
                className="shadow-sm px-4 position-fixed w-100"
                style={{ zIndex: 1000 }}
            >
                <Container fluid>
                    <Navbar.Toggle aria-controls="role-navbar" />
                    <Navbar.Collapse id="role-navbar">
                        <Nav className="me-auto ms-2">
                            {navLinks.map((link) => (
                                <Nav.Link
                                    key={link.path}
                                    as={Link}
                                    to={link.path}
                                    className={`fw-semibold ${location.pathname === link.path
                                            ? "text-info border-bottom border-info"
                                            : "text-dark"
                                        }`}
                                >
                                    {link.label}
                                </Nav.Link>
                            ))}
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
