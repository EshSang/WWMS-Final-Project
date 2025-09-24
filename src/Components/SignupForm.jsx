import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Footer from "../Components/Footer"

function SignupForm() {
  return (
    <div>
     <div className="d-flex justify-content-center" style={{ marginTop: '120px', marginBottom: '145px' }}>
        <div className="border rounded shadow p-20" style={{
          width: '1030px',
          height: '600px',
          background: `linear-gradient(to right, white 0%, white 678px, #0FC5BB 678px, #0FC5BB 100%)`
        }}>

          <div className="text-center position-absolute fs-3" style={{  marginTop: '20px', marginLeft:'200px'}}>
            Create Account
          </div>

          {/* Login Form */}

          <form style={{ marginTop: '100px', marginBottom: '80px' }}>
            
            {/* First Name Input box  */}
            <div class="mb-3" style={{ marginLeft:'130px'}}>
              <input type="fname" class="form-control" id="exampleInputFirstName" aria-describedby="fnameHelp" placeholder='First Name' style={{ width: '400px' }} />
            </div>

            {/* Last Name Input box  */}
            <div class="mb-3" style={{ marginLeft:'130px'}}>
              <input type="lname" class="form-control" id="exampleInputLastName" aria-describedby="lnameHelp" placeholder='Last Name' style={{ width: '400px' }} />
            </div>

            {/* Phone No Input box  */}
            <div class="mb-3" style={{ marginLeft:'130px'}}>
              <input type="phoneno" class="form-control" id="exampleInputPhoneNo" aria-describedby="phonenoHelp" placeholder='Phone No' style={{ width: '400px' }} />
            </div>

            {/* Email Input box  */}
            <div class="mb-3" style={{ marginLeft:'130px'}}>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' style={{ width: '400px' }} />
            </div>

            {/* Password Input box  */}
            <div class="mb-3" style={{ marginLeft:'130px'}}>
              <input class="form-control" id="exampleInputPassword1" placeholder='Password' style={{ width: '400px' }} type="password"/>
  
              
            </div>
            {/* Sign up button  */}
            <button type="submit" class="btn btn-primary rounded-pill position-absolute " style={{ marginLeft:'180px', marginTop: '20px', marginBottom: '50px', width: '300px', backgroundColor: '#0FC5BB', borderColor: '#0FC5BB' }}>Sign Up</button>

            {/* Divider */}
            <div className="d-flex align-items-center  my-3">
              <hr className="flex-grow-0" style={{ marginLeft:'150px', marginTop: '80px', width: '150px' }} />
              <span className="px-2 text-muted" style={{marginTop: '60px', fontSize: "12px"}}>Or</span>
              <hr className="flex-grow-0" style={{ marginTop: '80px', width: '150px' }} />
            </div>

            {/* Google Sign up button  */}
            <button type="submit" class="btn btn-primary rounded-pill position-absolute" style={{ marginLeft:'180px', marginTop: '1px', marginBottom: '30px', width: '300px', backgroundColor: '#FFFFFF', color: '#0FC5BB', borderColor: '#0FC5BB'}}>
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="me-2 position-absolute" style={{left:'40px'}}
            />Sign Up with Google</button>
            
          </form>

          {/* Login Form Welcome folks section */}


          <div className='mt-5 position-absolute '  style={{ marginTop: '100px',top: '250px',left: '1200px',height: '600px',width:'357px'}}>
              <div className="h4 m-3 align-super text-light justify-content-center">Welcome folks</div>
              <div className=" text-light mt-5 position-absolute text-wrap">Enter your personal details </div>  

          </div> 

          <div className='fs-10 p-20 position-absolute top-10 start-30 translate-middle'  style={{ left: '750px'}}>
            Already have an account?
            <button type="button" class="btn" style={{color:'#0FC5BB'}}>Sign In</button>
          </div>

          {/* please login your personal info */}

          
        {/* <div className="border rounded position-absolute"
            style={{
              top: '128px',
              left: '1115px',
              backgroundColor: '#0FC5BB',
              width: '352px',
              height: '600px',
              borderTopRightRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0'
            }}>



          </div> */}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SignupForm
