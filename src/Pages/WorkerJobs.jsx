import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Navbar } from 'react-bootstrap';
import { GeoAlt, CalendarDate, PersonCircle, FileEarmarkPlus, ArrowRight } from 'react-bootstrap-icons';
import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowBigRightDash } from 'lucide-react';
import TopNavbar from '../Components/TopNavbar';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function WorkerJobs() {


    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/available_jobs")
            .then(res => {
                console.log("Response data:", res.data);
                setJobs(res.data)

            })
            .catch(err => console.error("Error fetching jobs:", err));
    }, []);


    const handleMyServiceClick = () => {
        navigate("/workermyservice");
    };

    

    //console.log("avaial jobs:", jobs);

    // const jobs = [
    //     {
    //         id: 1,
    //         title: 'Need Plumber',
    //         description: 'I need a good plumber for fix my wash room tap',
    //         location: 'Maharagama',
    //         date: '02 March 2025',
    //     },
    //     {
    //         id: 2,
    //         title: 'Need Electrician',
    //         description: 'I need a good electrician for fix the current issue my shop',
    //         location: 'Galle',
    //         date: '05 March 2025',
    //     },
    //     {
    //         id: 3,
    //         title: 'Painter',
    //         description: 'I need a good painter for paint my house',
    //         location: 'Anuradhapura',
    //         date: '09 March 2025',
    //     },
    //     {
    //         id: 4,
    //         title: 'Garagemon',
    //         description: 'I need a good painter for paint my house',
    //         location: 'Anuradhapura',
    //         date: '09 March 2025',
    //     },
    //     {
    //         id: 5,
    //         title: 'Painter',
    //         description: 'I need a good painter for paint my house',
    //         location: 'Anuradhapura',
    //         date: '09 March 2025',
    //     },
    // ];

    return (
        <div>
            <div className="min-vh-100 d-flex flex-column bg-light">
                {/* Navbar */}
                <TopNavbar />


                {/* Search bar */}
                <Container className="my-4">
                    <InputGroup className="mb-3 mt-5" style={{ width: "350px" }}>
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Search Jobs" />
                    </InputGroup>
                    <hr className="mt-4 mb-4" />
                    <Button variant="outline-dark" className="mb-3">
                        Most Recent
                    </Button>

                    {/* Job Cards */}
                    <div>
                        {/* {jobs.map((job) => ( */}
                        {jobs.map((job, index) => (
                            <Card key={index} className="mb-3 border-0 shadow-sm">
                                <Card.Body className="d-flex justify-content-between align-items-center bg-light-subtle">
                                    <div>
                                        <Card.Title className="fw-semibold">{job.job_title}</Card.Title>
                                        <Card.Text className="text-muted mb-2">{job.job_description}</Card.Text>
                                        <div className="d-flex align-items-center text-secondary small">
                                            <GeoAlt size={14} className="me-1" />
                                            {job.job_location}
                                            <CalendarDate size={14} className="ms-3 me-1" />
                                            {/* {job.job_posted_date} */}
                                            {new Date(job.job_posted_date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    {/* <FileEarmarkPlus size={30} className="text-info" /> */}
                                    {/* <ArrowBigRightDash className='cursor-pointer' /> */}
                                    <ArrowRight size={20} className='cursor-pointer text-info' />

                                </Card.Body >
                            </Card>
                        ))}
                    </div>
                </Container>

            </div>
            <Footer />
        </div>
    )
}
