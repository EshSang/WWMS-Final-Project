import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import Footer from "./Footer"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignupForm() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    fname: '',
    lname: '',
    phonenumber: '',
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ✅ Frontend validation (empty field check)
    if (!values.fname || !values.lname || !values.phonenumber || !values.email || !values.password) {
      setErrorMessage("⚠️ Please fill in all the required fields.");
      setSuccessMessage('');
      return;
    }

    axios.post('http://localhost:8081/signup', values)
      .then(res => {
        console.log("Signup Response:", res.data);

        // Check backend duplicate response
        if (res.data === "User already exists" || res.data?.message === "User already exists") {
          setErrorMessage("⚠️ This email is already registered. Please use a different one.");
          setSuccessMessage('');
          return;
        }

        // Success
        setSuccessMessage(" ✅ User registered successfully!");
        setErrorMessage('');

        // Clear form
        setValues({
          fname: '',
          lname: '',
          phonenumber: '',
          email: '',
          password: ''
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(err => {
        console.error("Signup Error:", err);
        setErrorMessage("❌ Something went wrong. Please try again later.");
        setSuccessMessage('');
      });
  };

  return (
    <>
      {/* Success & Error Messages */}
      <div className="mt-3 text-center" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        {successMessage && <Alert variant="success" className="py-2">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger" className="py-2">{errorMessage}</Alert>}
      </div>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '88vh' }}>
        <div className="shadow rounded" style={{ width: '1050px', background: '#fff' }}>
          <div className="row g-0" style={{ height: '600px', display: 'flex', flexWrap: 'nowrap' }}>
            
            {/* Left: Form */}
            <div className="col-7 d-flex flex-column justify-content-center align-items-center" style={{ background: '#fff', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', height: '600px' }}>
              <div className="w-100 px-5">
                <div className="text-center fs-3 mb-2" style={{ marginTop: '20px' }}>
                  Create Account
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="fname"
                      className="form-control"
                      placeholder="First Name"
                      value={values.fname}
                      onChange={handleChange}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="lname"
                      className="form-control"
                      placeholder="Last Name"
                      value={values.lname}
                      onChange={handleChange}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="phonenumber"
                      className="form-control"
                      placeholder="Phone Number"
                      value={values.phonenumber}
                      onChange={handleChange}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="input-group" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="submit"
                      className="btn rounded-pill"
                      style={{
                        width: '300px',
                        backgroundColor: '#0FC5BB',
                        borderColor: '#0FC5BB',
                        color: '#fff',
                        fontWeight: 500
                      }}
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="text-center mt-3" style={{ fontSize: '14px' }}>
                    Already have an account?{' '}
                    <button onClick={() => navigate("/")} type="button" className="btn p-0" style={{ color: '#0FC5BB', fontWeight: 500, fontSize: '12px' }}>
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Welcome */}
            <div
              className="col-5 d-flex flex-column justify-content-center align-items-center"
              style={{
                background: '#0FC5BB',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                color: '#fff',
                height: '600px'
              }}
            >
              <div className="text-center px-4 w-100">
                <div className="h2 mb-3" style={{ fontWeight: 700 }}>Welcome folks</div>
                <div style={{ fontSize: '18px', fontWeight: 400 }}>
                  Enter your personal details<br />
                  and start your journey with us
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignupForm;
