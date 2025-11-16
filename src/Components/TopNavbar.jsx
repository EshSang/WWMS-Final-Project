import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";



export default function TopNavbar() {

    const location = useLocation();
    const { selectedType: stateSelectedType } = location.state || {}; // Access passed value

    const navigate = useNavigate();
    
    // Get selectedType from state, sessionStorage, or infer from URL path
    let userRole;
    if (stateSelectedType) {
        // If state has it, use it and save to sessionStorage
        userRole = stateSelectedType;
        sessionStorage.setItem("selectedType", stateSelectedType);
    } else {
        // Try to get from sessionStorage
        const storedType = sessionStorage.getItem("selectedType");
        if (storedType) {
            userRole = storedType;
        } else {
            // Infer from URL path as fallback
            const path = location.pathname;
            if (path.startsWith("/worker")) {
                userRole = "Worker";
                sessionStorage.setItem("selectedType", "Worker");
            } else if (path.startsWith("/customer")) {
                userRole = "Customer";
                sessionStorage.setItem("selectedType", "Customer");
            } else {
                // Default to Customer if path doesn't match
                userRole = "Customer";
            }
        }
    }
    
    console.log("Selected Type in Navbar:", userRole);

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
    const navLinks = userRole === "Worker" ? workerLinks : customerLinks;
    

    const handleUserProfileClick = () => {
    navigate("profile");
  };

    return (
        <div className="pb-5">
            <Navbar
                bg="white"
                expand="lg"
                className="shadow-sm px-4 w-100 postion-fixed-top"
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
                            <Link to="/profile">
                            <button className="cursor-pointer bg-transparent border-0 p-0">
                            <img
                                src="/Profile.png"
                                alt="Profile"
                                className="rounded-circle border border-info"
                                width="40"
                                height="40"
                                style={{ objectFit: "cover" }}
                            />
                            </button>
                            </Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
