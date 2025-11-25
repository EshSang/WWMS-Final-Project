import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from '../../Components/TopNavbar';
import Footer from "../../Components/Footer";
import axiosInstance from '../../api/axios';

export default function CustomerJobPost() {

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getLoginEmail = localStorage.getItem("logginUserEmail");

  const [formData, setformData] = useState({
    job_title: "",
    job_location: "",
    job_description: "",
    skills: "",
    job_posted_date: "",
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    job_category: "",
    hourly_rate: "",
  });

  const [errors, setErrors] = useState({});


  //VALIDATION FUNCTION
  
  const validateForm = () => {
    let formErrors = {};

    if (!formData.job_title.trim()) {
      formErrors.job_title = "Job title is required.";
    }

    if (!formData.job_location.trim()) {
      formErrors.job_location = "Job location is required.";
    }

    if (!formData.job_category.trim()) {
      formErrors.job_category = "Please select a category.";
    }

    if (!formData.hourly_rate || formData.hourly_rate <= 0) {
      formErrors.hourly_rate = "Hourly rate must be greater than 0.";
    }

    if (!formData.job_description.trim()) {
      formErrors.job_description = "Job description is required.";
    }

    if (!formData.skills.trim()) {
      formErrors.skills = "Skills are required.";
    }

    if (!formData.customer_name.trim()) {
      formErrors.customer_name = "Customer name is required.";
    }

    if (!formData.customer_phone.trim() || formData.customer_phone.length !== 10) {
      formErrors.customer_phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.customer_address.trim()) {
      formErrors.customer_address = "Customer address is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!validateForm()) {
      return;
    }

    axiosInstance.post("/api/jobs", formData)
      .then(res => {
        if (res.data === "This record already exists" || res.data?.message === "This record already exists") {
          setErrorMessage("⚠️ This record is already there. Please use a different one.");
          toast.error("⚠️ This record already exists!");
          return;
        }

        setSuccessMessage("✅ Submitted successfully!");
        toast.success("✅ Submitted successfully!");

        setformData({
          job_title: "",
          job_location: "",
          job_description: "",
          skills: "",
          job_posted_date: "",
          customer_name: "",
          customer_phone: "",
          customer_address: "",
          job_category: "",
          hourly_rate: "",
        });

        setTimeout(() => navigate("/customerjobs"), 2000);
      })
      .catch(() => {
        setErrorMessage("❌ Something went wrong. Please try again later.");
        toast.error("❌ Something went wrong. Please try again later.");
      });
  };

  // Display today's date
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setformData((prevData) => ({
      ...prevData,
      job_posted_date: formattedDate,
    }));
  }, []);

  // Load categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axiosInstance.get("/api/categories")
      .then((res) => {
        if (!isMounted) return;
        const payload = res.data.categories || res.data;
        setCategories(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load categories:", err);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <TopNavbar />

      <div>
        <Container>
          <h3>Add Job Details</h3>
          <hr />

          {/* ================================
              ENABLE BOOTSTRAP VALIDATION
              ================================= */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter job title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={(e) => {
                      setformData({ ...formData, job_title: e.target.value });
                      if (errors.job_title) {
                        setErrors({ ...errors, job_title: "" });
                      }
                    }}
                    isInvalid={!!errors.job_title}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.job_title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter job location"
                    name="job_location"
                    value={formData.job_location}
                    onChange={(e) => {
                      setformData({ ...formData, job_location: e.target.value });
                      if (errors.job_location) {
                        setErrors({ ...errors, job_location: "" });
                      }
                    }}
                    isInvalid={!!errors.job_location}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.job_location}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="job_category"
                value={formData.job_category}
                onChange={(e) => {
                  setformData({ ...formData, job_category: e.target.value });
                  if (errors.job_category) {
                    setErrors({ ...errors, job_category: "" });
                  }
                }}
                isInvalid={!!errors.job_category}
                required
              >
                <option value="">-- Select Category --</option>

                {categories.map((cat) => {
                  const key = cat.category_id ?? cat.id ?? cat._id ?? JSON.stringify(cat);
                  const value = cat.category ?? cat.name ?? cat.id ?? "";
                  const label = cat.category ?? cat.name ?? value;
                  return (
                    <option key={key} value={value}>
                      {label}
                    </option>
                  );
                })}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.job_category}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hourly Rate (LKR)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter hourly rate"
                name="hourly_rate"
                value={formData.hourly_rate}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setformData({ ...formData, hourly_rate: numericValue });

                  if (errors.hourly_rate) {
                    setErrors({ ...errors, hourly_rate: "" });
                  }
                }}
                isInvalid={!!errors.hourly_rate}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.hourly_rate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter job description"
                name="job_description"
                value={formData.job_description}
                onChange={(e) => {
                  setformData({ ...formData, job_description: e.target.value });
                  if (errors.job_description) {
                    setErrors({ ...errors, job_description: "" });
                  }
                }}
                isInvalid={!!errors.job_description}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.job_description}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter required skills"
                    name="skills"
                    value={formData.skills}
                    onChange={(e) => {
                      setformData({ ...formData, skills: e.target.value });
                      if (errors.skills) {
                        setErrors({ ...errors, skills: "" });
                      }
                    }}
                    isInvalid={!!errors.skills}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.skills}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Posted Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="job_posted_date"
                    value={formData.job_posted_date}
                    disabled
                    isInvalid={!!errors.job_posted_date}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.job_posted_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter customer name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => {
                      setformData({ ...formData, customer_name: e.target.value });
                      if (errors.customer_name) {
                        setErrors({ ...errors, customer_name: "" });
                      }
                    }}
                    isInvalid={!!errors.customer_name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.customer_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, "");
                      setformData({ ...formData, customer_phone: numericValue });

                      if (errors.customer_phone) {
                        setErrors({ ...errors, customer_phone: "" });
                      }
                    }}
                    maxLength={10}
                    isInvalid={!!errors.customer_phone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.customer_phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Customer Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer address"
                name="customer_address"
                value={formData.customer_address}
                onChange={(e) => {
                  setformData({ ...formData, customer_address: e.target.value });
                  if (errors.customer_address) {
                    setErrors({ ...errors, customer_address: "" });
                  }
                }}
                isInvalid={!!errors.customer_address}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.customer_address}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center mb-5 pb-5">
              <Button variant="primary" type="submit" className="px-5">
                Submit
              </Button>
            </div>
          </Form>
        </Container>

        <Footer />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
