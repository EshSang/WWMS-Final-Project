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
import { useNavigate } from 'react-router-dom';

export default function WorkerJobs() {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    // for search functionality
    const [searchTerm, setSearchTerm] = useState("");


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



    // FILTER
    const filteredJobs = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) 

        //|| job.job_description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // SORT BY MOST RECENT
    const sortedJobs = [...filteredJobs].sort(
        (a, b) => new Date(b.job_posted_date) - new Date(a.job_posted_date)
    );



    return (
        <div>
            <div className="min-vh-100 d-flex flex-column bg-light">
                {/* Navbar */}
                <TopNavbar />


                {/* Search bar */}
                <Container className="my-4">
                    <InputGroup style={{ width: "350px" }}>
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text" 
                        placeholder="Search Jobs" />
                    </InputGroup>
                    <hr className="mt-4 mb-4" />
                    <Button 
                    disabled 
                    variant="outline-dark" 
                    className="mb-3 no-hover">

                        Most Recent
                    </Button>

                    {/* Job Cards */}
                    <div>
                        {/* {jobs.map((job, index) => ( */}
                        {sortedJobs.map((job, index) => (
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

                                    {/* <button onClick={handleViewJob} type="button" class="btn btn-outline-info btn-sm"> View </button>  */}
                                    <button onClick={() => navigate(`/workerviewjob/${job.job_id}`, { state: job })} type="button" className="btn btn-light btn-sm"> View </button>


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
