import React from 'react'
import Footer from "../Components/Footer"

//const [showPassword, setShowPassword] = useState(false);

function SigninForm() {
  return (
    < >
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '88vh' }}>
        <div className="shadow rounded" style={{ width: '1050px', background: '#fff' }}>
          <div className="row g-0" style={{ height: '600px', display: 'flex', flexWrap: 'nowrap' }}>
            {/* Left: Form */}
            <div className="col-7 d-flex flex-column justify-content-center align-items-center" style={{ background: '#fff', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', height: '600px' }}>
              <div className="w-100 px-5">
                <div className="text-center fs-3 mb-4" style={{ marginTop: '20px' }}>
                  Sign in to your Account
                </div>
                <form>
                  {/* Email Input */}
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    />
                  </div>
                  {/* Password Input */}
                  <div className="mb-2">
                    <div className="input-group" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  {/* Forgot password */}
                  <div className="d-flex justify-content-end" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <small className="text-muted" style={{ cursor: "pointer" }}>
                      Forgot Password?
                    </small>
                  </div>
                  {/* Sign in button */}
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
                    >
                      Sign In
                    </button>
                  </div>
                  {/* Divider */}
                  <div className="d-flex align-items-center my-4" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <hr className="flex-grow-1" />
                    <span className="px-2 text-muted" style={{ fontSize: "12px" }}>Or</span>
                    <hr className="flex-grow-1" />
                  </div>
                  {/* Google Sign in button */}
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn rounded-pill d-flex align-items-center justify-content-center"
                      style={{
                        width: '300px',
                        backgroundColor: '#fff',
                        color: '#0FC5BB',
                        borderColor: '#0FC5BB',
                        borderWidth: '2px',
                        fontWeight: 500
                      }}
                    >
                      <img
                        src="https://img.icons8.com/color/24/000000/google-logo.png"
                        alt="Google"
                        className="me-2"
                        style={{ width: '24px', height: '24px' }}
                      />
                      Sign In with Google
                    </button>
                  </div>
                  {/* Sign up link */}
                  <div className="text-center mt-2" style={{ fontSize: '14px' }}>
                    Don't have an account?{' '}
                    <button type="button" className="btn p-0" style={{ color: '#0FC5BB', fontWeight: 500 }}>
                      Sign Up
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
                  To keep connected with us<br />
                  please login your personal info
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

export default SigninForm