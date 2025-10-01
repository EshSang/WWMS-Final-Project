import React from 'react'
import Footer from "../Components/Footer"

//const [showPassword, setShowPassword] = useState(false);

function SigninForm() {
  
  return (
    <>
      <div className="cvh-100 d-flex justify-content-center align-items-center" style={{ marginTop: '50px', marginBottom: '100px' }}>
        <div className="border rounded shadow p-20" style={{
          width: '1030px',
          height: '600px',
          background: `linear-gradient(to right, white 0%, white 678px, #0FC5BB 678px, #0FC5BB 100%)`
        }}>

          <div className="text-center position-absolute fs-3" style={{  marginTop: '20px', marginLeft:'200px'}}>
            Sign in to your Account
          </div>

          {/* Login Form */}

          <form style={{ marginTop: '150px', marginBottom: '80px' }}>
            {/* Email Input box  */}
            <div class="mb-3" style={{ marginLeft:'130px'}}>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' style={{ width: '400px' }} />
            </div>

            {/* Password Input box  */}
            <div class="mb-3" style={{ marginTop: '30px', marginLeft:'130px'}}>
              <input class="form-control" id="exampleInputPassword1" placeholder='Password' style={{ width: '400px' }} type="password"/>
              {/* <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i> // Bootstrap Icon
                ) : (
                  <i className="bi bi-eye"></i> // Bootstrap Icon
                )}
              </button> */}
              
            </div>

            {/* Forgot password */}
            <small className="d-block text-end mt-1 text-muted position-absolute" style={{marginLeft:'420px', cursor: "pointer" }}>
                  Forgot Password?
            </small>
      
            {/* Sign in button  */}
            <button type="submit" class="btn btn-primary rounded-pill position-absolute " style={{ marginLeft:'180px', marginTop: '50px', marginBottom: '50px', width: '300px', backgroundColor: '#0FC5BB', borderColor: '#0FC5BB' }}>Sign In</button>

            {/* Divider */}
            <div className="d-flex align-items-center  my-3">
              <hr className="flex-grow-0" style={{ marginLeft:'150px', marginTop: '120px', width: '150px' }} />
              <span className="px-2 text-muted" style={{marginTop: '100px', fontSize: "12px"}}>Or</span>
              <hr className="flex-grow-0" style={{ marginTop: '120px', width: '150px' }} />
            </div>

            {/* Google Sign in button  */}
            <button type="submit" class="btn btn-primary rounded-pill position-absolute" style={{ marginLeft:'180px', marginTop: '5px', marginBottom: '50px', width: '300px', backgroundColor: '#FFFFFF', color: '#0FC5BB', borderColor: '#0FC5BB'}}>
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="me-2 position-absolute" style={{left:'40px'}}
            />Sign In with Google</button>
            
          </form>

          {/* Login Form Welcome folks section */}


          <div className='mt-5 position-absolute '  style={{ marginTop: '100px',top: '250px',left: '1200px',height: '600px',width:'357px'}}>
              <div className="h4 m-3 align-super text-light justify-content-center">Welcome folks</div>
              <div className=" text-light mt-5 position-absolute text-wrap">To keep connected with us </div>  

          </div> 

          <div className='fs-10 p-20 position-absolute  translate-middle'  style={{ left: '750px'}}>
            Don't have an account? 
            <button type="button" class="btn" style={{color:'#0FC5BB'}}>Sign Up</button>
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

    </>

        
  
  )
}

export default SigninForm