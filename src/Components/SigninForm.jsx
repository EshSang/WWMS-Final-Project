import React from 'react'
import Footer from "../Components/Footer"

function SigninForm() {
  return (
    <>
        <div className="d-flex justify-content-center" style={{ marginTop: '120px' , marginBottom: '145px' }}>
            <div className="border rounded shadow p-20" style={{ 
              width: '1030px', 
              height: '600px',
              background: `linear-gradient(to right, white 0%, white 678px, #0FC5BB 678px, #0FC5BB 100%)`}}>
              
                <div className="text-left h4 m-3 mb-4">
                    Sign in to your Account
                </div>
                
                {/* Login Form */}
                
                  <form style={{ marginTop: '80px' , marginBottom: '80px' }}>
                      <div class="mb-3">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' style={{width:'400px'}}/>
                      </div>

                      <div class="mb-3">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Password' style={{width:'400px'}} />
                      </div>
                    <button type="submit" class="btn btn-primary rounded-pill" style={{ marginTop: '50px' , marginBottom: '50px', width:'200px', backgroundColor: '#0FC5BB', borderColor: '#0FC5BB'}}>Sign In</button>
                </form>
               
               {/* Login Form Welcome folks section */}


               <div className='mt-5 position-absolute '  style={{ marginTop: '100px',top: '250px',left: '1200px',height: '600px',width:'357px'}}>
                      <div className="h4 m-3 text-light justify-content-center">Welcome folks</div>
                      <div className="fs-6 text-light wrap-normal">To keep connected with us please login your personal info</div>
                </div>
               
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
                    borderBottomLeftRadius: '0'}}>

                    

                  </div> */}
               

            </div>
        </div>

    </>
  )
}

export default SigninForm