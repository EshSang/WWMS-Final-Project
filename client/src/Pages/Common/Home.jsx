import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {

  //navigate to sign up page
  const navigate = useNavigate();

  const handleWorkerJobClick = (type) => {
    // Store selected type in sessionStorage for persistence
    sessionStorage.setItem("selectedType", type);
    // Navigate to next page and pass selected type
    navigate("/workerjob", { state: { selectedType: type }});
  };

  const handleCustomerJobClick = (type) => {
    // Store selected type in sessionStorage for persistence
    sessionStorage.setItem("selectedType", type);
    // Navigate to next page and pass selected type
    navigate("/customerjobs", { state: { selectedType: type }});
  };

  // const handleSelect = (type) => {
  //   sessionStorage.setItem("userType", type); // Store value

  //   if (type === "Worker") {
  //     navigate("/workerjob"); // Redirect to next page
  //   } else
  //   navigate("/customerjobs"); // Redirect to next page
  // };
   
  return (
  
      <div>
      <div className="d-flex flex-column min-vh-100 bg-light">
        {/* Navbar */}
        <nav className="navbar bg-white shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
          <h6 className="m-0 fw-semibold">Wage Worker Management System</h6>
          <div className="d-flex align-items-center">
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
        </nav>

        {/* Main Content */}
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center">

          <div className="card shadow-sm p-5 text-center" style={{ maxWidth: "700px", width: "100%" }}>
            <h4 className="fw-bold mb-3">Select your type</h4>
            <p className="text-muted mb-4">
              Join as a worker or hire a worker—pick the option that suits you best!
            </p>

            <div className="d-flex justify-content-center gap-4">
              {/* Worker Card */}
              <div
                className="card p-4 shadow-sm border-0 hover-card"
                style={{ width: "180px", cursor: "pointer" }}
                onClick={() => handleWorkerJobClick("Worker")}
              >
                <img
                  src="/public/Worker.png"
                  alt="Worker"
                  width="60"
                  height="60"
                  className="mx-auto mb-3"
                />
                <h6>Worker</h6>
              </div>

              {/* Customer Card */}
              <div
                className="card p-4 shadow-sm border-0 hover-card"
                style={{ width: "180px", cursor: "pointer" }}
                onClick={() => handleCustomerJobClick("Customer")}
              >
                <img
                  src="/public/Customer.png"
                  alt="Customer"
                  width="60"
                  height="60"
                  className="mx-auto mb-3"
                />
                <h6>Customer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

