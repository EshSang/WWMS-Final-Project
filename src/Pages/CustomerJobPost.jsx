import React, { useState, useEffect } from 'react';
import TopNavbar from '../Components/TopNavbar';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Footer from "../Components/Footer";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function CustomerJobPost() {

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setformData] = useState({
    job_title: "",
    job_location: "",
    job_description: "",
    skills: "",
    job_posted_date: "",
    customer_name: "",
    customer_phone: "",
    customer_address: "", 
    job_status: "", 
    submitted_user_email: "", 
    job_categoty: ""
  });


  const [errors, setErrors] = useState({});

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

  

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!validateForm()) {
      return;
    }

    axios.post("http://localhost:8081/customerjobpost", formData)
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
          job_status: "open", 
          submitted_user_email: "eshana21@gmail.com", 
          job_categoty: ""
        });

        setTimeout(() => navigate("/"), 2000);
      })
      .catch(() => {
        setErrorMessage("❌ Something went wrong. Please try again later.");
        toast.error("❌ Something went wrong. Please try again later.");
      });
  };

  //Display today date in the date picker
  useEffect(() => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // format: YYYY-MM-DD
  setformData((prevData) => ({
    ...prevData,
    job_posted_date: formattedDate,
  }));
}, []);


//Get categories from the database
const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get("http://localhost:8081/job_category")
      .then((res) => {
        if (!isMounted) return;
        // Handle common API response shapes
        const payload = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.data) ? res.data.data : []);
        setCategories(payload || []);
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
        <hr/>

        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  name="job_title"
                  value={formData.job_title}
                  //onChange={handleChange}
                  onChange={(e) => {
                  setformData({ ...formData, job_title: e.target.value });

                  // Clear validation error for this field
                  if (errors.job_title) {
                  setErrors({ ...errors, job_title: "" });
                    }
                  }}
                  isInvalid={!!errors.job_title}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.job_title}</Form.Control.Feedback>
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
                  //onChange={handleChange}
                  onChange={(e) => {
                  setformData({ ...formData, job_location: e.target.value });

                  // Clear validation error for this field
                  if (errors.job_location) {
                  setErrors({ ...errors, job_location: "" });
                    }
                  }}
                  isInvalid={!!errors.job_location}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.job_location}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.categories}
                onChange={(e) => {
                  setformData({ ...formData, job_category: e.target.value });

                  // Clear validation error for this field
                  if (errors.job_category) {
                    setErrors({ ...errors, job_category: "" });
                  }
                }}
                isInvalid={!!errors.job_category}
                required
              >
                {/* <option value="">-- Select Category --</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">Human Resources</option> */}

                <option value="">-- Select Category --</option>

                {categories.map((cat) => {
                  const key = cat.id ?? cat._id ?? cat.name ?? JSON.stringify(cat);
                  const value = cat.name ?? cat.id ?? cat._id ?? "";
                  const label = cat.name ?? cat.categories ?? value;
                  return (
                    <option key={key} value={value}>
                      {label}
                    </option>
                  );
                })}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.category}
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
              //onChange={handleChange}
              onChange={(e) => {
                  setformData({ ...formData, job_description: e.target.value });

                  // Clear validation error for this field
                  if (errors.job_description) {
                  setErrors({ ...errors, job_description: "" });
                    }
              }}
              isInvalid={!!errors.job_description}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.job_description}</Form.Control.Feedback>
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
                  //onChange={handleChange}
                  onChange={(e) => {
                  setformData({ ...formData, skills: e.target.value });

                  // Clear validation error for this field
                  if (errors.skills) {
                  setErrors({ ...errors, skills: "" });
                    }
                  }}
                  isInvalid={!!errors.skills}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Job Posted Date</Form.Label>
                <Form.Control
                  type="date"
                  name="job_posted_date"
                  value={formData.job_posted_date}
                  //onChange={handleChange}
                  disabled
                  onChange={(e) => {
                  setformData({ ...formData, job_posted_date: e.target.value });

                  // Clear validation error for this field
                  if (errors.job_posted_date) {
                  setErrors({ ...errors, job_posted_date: "" });
                    }
                  }}
                  isInvalid={!!errors.job_posted_date}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.job_posted_date}</Form.Control.Feedback>
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
                  //onChange={handleChange}
                  onChange={(e) => {
                  setformData({ ...formData, customer_name: e.target.value });

                  // Clear validation error for this field
                  if (errors.customer_name) {
                  setErrors({ ...errors, customer_name: "" });
                    }
                  }}
                  isInvalid={!!errors.customer_name}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.customer_name}</Form.Control.Feedback>
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
                  //onChange={handleChange}
                  //pattern="[0-9]*"
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, ''); // remove non-numeric
                    setformData({ ...formData, customer_phone: numericValue });

                    // Clear validation error for this field
                  if (errors.customer_phone) {
                  setErrors({ ...errors, customer_phone: "" });
                    }
                  }}
                  maxLength={10} // optional: limit to 10 digits
                  isInvalid={!!errors.customer_phone}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.customer_phone}</Form.Control.Feedback>
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
              //onChange={handleChange}
              onChange={(e) => {
                  setformData({ ...formData, customer_address: e.target.value });

                  // Clear validation error for this field
                  if (errors.customer_address) {
                  setErrors({ ...errors, customer_address: "" });
                    }
              }}
              isInvalid={!!errors.customer_address}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.customer_address}</Form.Control.Feedback>
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


      

      {/* ✅ Toast notification container */}
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
