import React from 'react'
import { Container, Row, Col, Card, Button, Form, InputGroup, Navbar } from 'react-bootstrap';
import { GeoAlt, CalendarDate, PersonCircle, FileEarmarkPlus } from 'react-bootstrap-icons';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WorkerAnalytics() {
  return (
    <div>
      {/* Navbar */}
            <Navbar bg="white" expand="lg" className="shadow-sm px-4">
                {/* <Navbar.Brand href="#" className="fw-bold">
                        Jobs
                    </Navbar.Brand> */}
                <Nav className="ms-4">
                    <Nav.Link as={Link} to="/workerjob">Jobs</Nav.Link>
                    <Nav.Link as={Link} to="/workermyservice" >My Services</Nav.Link>
                    <Nav.Link as={Link} to="/workerorders" >Orders</Nav.Link>
                    <Nav.Link as={Link} to="/workerearning">Earning</Nav.Link>
                    <Nav.Link as={Link} to="/workerreviews">Reviews</Nav.Link>
                    <Nav.Link as={Link} to="/workeranalytics" className="fw-semibold">Analytics</Nav.Link>
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
    </div>
  )
}
