import React from 'react'
import TopNavbar from '../Components/TopNavbar'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Footer from "../Components/Footer";
import { useState } from 'react';
import axios from 'axios';

export default function CustomerJobPost() {

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    skills: "",
    jobPostedDate: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove error when user types something
    if (value.trim() !== "") {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        formErrors[key] = "This field is required";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      try {
        const res = await axios.post("http://localhost:8081/customerjobpost", formData);
        alert(res.data.message || "Form submitted successfully!");
        setFormData({
          jobTitle: "",
          jobLocation: "",
          jobDescription: "",
          skills: "",
          jobPostedDate: "",
          customerName: "",
          customerPhone: "",
          customerAddress: ""
        });
        // Clear errors after successful submission
        setErrors({});
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error submitting form. Please try again.";
        alert(errorMessage);
        console.error("Error details:", error);
      }
    } else {
      alert("Please fill all required fields.");
    }
  };
  
  return (
    <>
      <div>
      <TopNavbar/>

      <Container className="pt-5">
      <h3 className="text-left mb-4 pt-5">Add Job Details</h3>
      <hr className="mb-4" />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                isInvalid={!!errors.jobTitle}
              />
                <Form.Control.Feedback type="invalid">
                  {errors.jobTitle}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="jobLocation">
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job location"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleChange}
                isInvalid={!!errors.jobLocation}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.jobLocation}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="jobDescription">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter job description"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            isInvalid={!!errors.jobDescription}
          />
          <Form.Control.Feedback type="invalid">
            {errors.jobDescription}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="skills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter required skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                isInvalid={!!errors.skills}
              />
              <Form.Control.Feedback type="invalid">
                {errors.skills}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="jobPostedDate">
              <Form.Label>Job Posted Date</Form.Label>
              <Form.Control
                type="date"
                name="jobPostedDate"
                value={formData.jobPostedDate}
                onChange={handleChange}
                isInvalid={!!errors.jobPostedDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobPostedDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="customerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                isInvalid={!!errors.customerName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.customerName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="customerPhone">
              <Form.Label>Customer Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter customer phone number"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                isInvalid={!!errors.customerPhone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.customerPhone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="customerAddress">
          <Form.Label>Customer Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer address"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            isInvalid={!!errors.customerAddress}
          />
          <Form.Control.Feedback type="invalid">
            {errors.customerAddress}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="px-5">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
    
    </div>
    </>
  )
}
