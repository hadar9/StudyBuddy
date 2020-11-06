import React,{useState} from 'react'
import { Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';


function Register() {
    const[formData,setForm]=useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const {username,email,password,confirmpassword}=formData;

    const onchange = e => setForm({...formData,[e.target.name]:e.target.value});
    const onsubmit = e => {
        e.preventDefault();
     
        if(password!==confirmpassword)
        {
            console.log("passwrod do not match");
        }
        else
            console.log(formData);

    }
    return (
        <div className="register">
            <div className="registerform text-center">
                <h1 className="x-large">Register</h1>
                    <Form  onSubmit={e=>onsubmit(e)} >
                    <Form.Group controlId="formBasicusename">
                      <Form.Label>username</Form.Label>
                      <Form.Control type="text" placeholder="Enter username" name='username' value={username} onChange={e=>onchange(e)} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e=>onchange(e)} required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={password}  onChange={e=>onchange(e) } minLength='6'/>
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='confirmpassword' value={confirmpassword} onChange={e=>onchange(e)} minLength='6'/>
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