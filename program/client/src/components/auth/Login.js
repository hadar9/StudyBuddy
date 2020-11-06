import React,{useState} from 'react'
import { Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';


 function Login() {
    const[formData,setForm]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData;

    const onchange = e => setForm({...formData,[e.target.name]:e.target.value});
    const onsubmit = e => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <div className="login">
            <div className="loginform text-center">
                <h1 className="x-large">Sign in</h1>
                    <Form  onSubmit={e=>onsubmit(e)} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e=>onchange(e)} required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={password}  onChange={e=>onchange(e) }/>
                    </Form.Group>
                    <div className="text-center">
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                    </div>
                    </Form>
                    <p className="text-center my-3">
    Don't have an account yet? <Link to="/register">register</Link>
  </p>
    </div>
</div>
    )
}
export default Login;
