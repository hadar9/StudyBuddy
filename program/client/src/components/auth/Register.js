import React from 'react'
import { Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';

function Register() {
    return (
        <div className="register">
            <div className="registerform text-center">
                <h1 className="x-large">Register</h1>
                    <Form  >
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <div className="text-center">
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                    </div>
                    </Form>
                    <p className="text-center my-3">
    Already have an account? <Link to="/login">Sign in</Link>
  </p>
    </div>
</div>
    )
}
export default  Register;