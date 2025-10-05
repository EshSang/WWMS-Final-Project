import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Footer from "./Footer"
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

function SignupForm() {

  //navigate to sign in page
   const navigate = useNavigate();
  
    const handleSignInClick = () => {
      navigate("/");
    };

    //initial variable for form fields
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    phonenumber: '',
    email: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    
    axios.post('/signup', values)
      .then((res) => {
        const navigate = useNavigate(); //navigate to sign in page after successful sign up
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  


  return (
    <div>
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
                  {/* First Name Input */}
                  <div className="mb-2">
                    <input
                      type="text"
                      name='fname'
                      className="form-control"
                      placeholder="First Name"
                      onChange={(e) => setValues({ ...values, fname: e.target.value })}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>
                  
                  {/* Last Name Input */}
                  <div className="mb-2">
                    <input
                      type="text"
                      name='lname'
                      className="form-control"
                      placeholder="Last Name"
                      onChange={(e) => setValues({ ...values, lname: e.target.value })}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div className="mb-2">
                    <input
                      name='phonenumber'
                      className="form-control"
                      placeholder="Phone Number"
                      onChange={(e) => setValues({ ...values, phonenumber: e.target.value })}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>

                  {/* Email Address Input */}
                  <div className="mb-2">
                    <input
                      name='email'
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="mb-2">
                    <div className="input-group" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                      <input
                        name='password'
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* Forgot password */}
                  <div className="d-flex justify-content-end" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <small className="text-muted" style={{ cursor: "pointer" }}>
                      Forgot Password?
                    </small>
                  </div>
                  {/* Sign up button */}
                  <div className="d-flex justify-content-center mt-4">
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
                      onclick={handleSubmit}
                    >
                      Sign Up
                    </button>
                  </div>
                  {/* Divider */}
                  <div className="d-flex align-items-center my-4" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <hr className="flex-grow-1" />
                    <span className="px-2 text-muted" style={{ fontSize: "12px" }}>Or</span>
                    <hr className="flex-grow-1" />
                  </div>
                  {/* Google Sign up button */}
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn rounded-pill d-flex align-items-center justify-content-center"
                      style={{
                        width: '300px',
                        backgroundColor: '#fff',
                        color: '#0FC5BB',
                        borderColor: '#0FC5BB',
                        borderWidth: '1px',
                        fontWeight: 500
                      }}
                    >
                      <img
                        src="https://img.icons8.com/color/24/000000/google-logo.png"
                        alt="Google"
                        className="me-2"
                        style={{ width: '24px', height: '24px' }}
                      />
                      Sign Up with Google
                    </button>
                  </div>
                  {/* Sign in link */}
                  <div className="text-center mt-1" style={{ fontSize: '14px' }}>
                    Already have an account?{' '}
                    <button onClick={handleSignInClick} type="button" className="btn p-0" style={{ color: '#0FC5BB', fontWeight: 500, fontSize: '12px' }}>
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

    </div>
  )
}

export default SignupForm
