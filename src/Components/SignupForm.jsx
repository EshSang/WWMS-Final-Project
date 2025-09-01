import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function SignupForm() {
  return (
    <div>
     <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow d-flex flex-row overflow-hidden" style={{ maxWidth: '900px', borderRadius: '10px' }}>
        {/* Left Side - Login Form */}
        <Col md={7} className="p-5 bg-white">
          <h3 className="mb-4">Sign in to your Account</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control type="password" placeholder="Password" />
              <Form.Text className="text-muted text-end d-block">
                <a href="#" style={{color:"#959292"}}>Forgot Password?</a>
              </Form.Text>
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="info" className="text-white" size="lg">
                Sign In
              </Button>
            </div>

            <div className="text-center mb-3">Or</div>

            <div className="d-grid mb-3">
              <Button style={{borderColor:"#0FC5BB", color:'#0FC5BB'}} size="lg">
                <img
                  src= ""
                  alt=""
                  width="20"
                  className="me-2"
                />
                Sign In with Google
              </Button>
            </div>

            <div className="text-center">
              Don't have an account? <a href="#">Sign Up</a>
            </div>
          </Form>
        </Col>

        {/* Right Side - Welcome Message */}
        <Col md={5} className="d-flex flex-column justify-content-center align-items-center bg-info text-white p-4">
          <h4>Welcome folks</h4>
          <p className="text-center">To keep connected with us please login your personal info</p>
        </Col>
      </Card>
    </Container>
    </div>
  )
}

export default SignupForm
