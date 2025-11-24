import React, { useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import TopNavbar from "../../Components/TopNavbar";
import Footer from "../../Components/Footer";


export default function WorkerViewJob() {

    const navigate = useNavigate();

    const handleBackWorkerJob = () => {
        navigate("/workerjob");
    }

    const { state } = useLocation();
    const job = state;
    console.log("Job details:", job);

    const [show, setShow] = useState(false);

    return (



        <div>
            <div className="min-vh-100 d-flex flex-column bg-light">
                {/* Navbar */}
                <TopNavbar />


                <div className="bg-light" style={{ background: "#fff", padding: "20px 250px" }}>
                    

                    {/* back arrow */}
                    <div className="d-flex align-items-center mb-3">
                        <FaArrowLeft onClick={handleBackWorkerJob} size={20} style={{ cursor: "pointer" }} />
                        <span className="ms-2" style={{ fontSize: "14px" }}>View Job Details</span>
                    </div>

                    <hr />

                    {/* Job Title */}
                    <h3 className="fw-semibold mb-3">{job.job_title}</h3>

                    {/* Location + Date */}
                    <div className="d-flex mb-4">
                        <div className="d-flex align-items-center me-4">
                            <FaMapMarkerAlt size={16} className="me-2" />
                            <span>{job.job_location}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <FaRegCalendarAlt size={16} className="me-2" />
                            <span>
                                {new Date(job.job_posted_date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    <hr />

                    {/* Description */}
                    <h5 className="fw-semibold">Description</h5>
                    <p style={{ textAlign: "justify", lineHeight: "1.7" }}>
                        {job.job_description}
                    </p>

                    <hr />

                    {/* Skills */}
                    <h5 className="fw-semibold">Skills</h5>
                    <div className="d-flex gap-2 mb-4">
                        <span className="px-3 py-1 border rounded-pill">{job.skills}</span>
                    </div>

                    <hr />

                    {/* Contact Details */}
                    <h5 className="fw-semibold">Contact Details</h5>
                    <div className="row mt-3 mb-5">
                        <div className="col-md-3">
                            <strong>Name :</strong> {job.customer_name}
                        </div>
                        <div className="col-md-4">
                            <strong>Contact No :</strong> {job.customer_phone}
                        </div>
                        <div className="col-md-5">
                            <strong>Address :</strong> {job.customer_address}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="text-end">
                        <Button
                            onClick={() => setShow(true)}
                            variant="outline-info"
                            style={{
                                padding: "8px 30px",
                                borderRadius: "8px",
                            }}
                        >
                            Apply
                        </Button>
                    </div>

                    {/* POPUP MODAL */}
                    <Modal show={show} onHide={() => setShow(false)} centered>
                        <Modal.Header
                            closeButton
                            style={{ backgroundColor: "green", color: "white" }}
                        >
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="text-center" style={{ height: "80px" }}>
                            <h5>Are you sure want to apply this job?</h5>
                        </Modal.Body>

                        <Modal.Footer className="d-flex justify-content-center">
                            <Button variant="outline-secondary" style={{ width: "120px" }} onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                            <Button variant="outline-success" style={{ width: "120px" }} >Yes</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Footer */}
                    {/* <Footer/> */}
                    
                </div>

            </div>
            <Footer />
        </div>




    )
}
