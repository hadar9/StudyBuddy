import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import { setalert, deletealert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/auth';

function Register({ register, setalert, alerts, isAuthenticated, loadUser }) {
  const [formData, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const { username, email, password, confirmpassword } = formData;

  const onchange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });
  const onsubmit = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setalert('passwords dont match!', 'danger');
    } else register({ username, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/home'></Redirect>;
  }

  return (
    <div className='register'>
      <div className='registerform text-center'>
        <Alert variant={alerts.mtype}>{alerts.msg}</Alert>
        <h1 className='x-large'>Register</h1>
        <Form onSubmit={(e) => onsubmit(e)}>
          <Form.Group controlId='formBasicusename'>
            <Form.Label>username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              name='username'
              value={username}
              onChange={(e) => onchange(e)}
              required
              maxLength='7'
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={(e) => onchange(e)}
              required
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onchange(e)}
              minLength='6'
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group controlId='formBasicConfirmPassword'>
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='confirmpassword'
              value={confirmpassword}
              onChange={(e) => onchange(e)}
              minLength='6'
              autoComplete='off'
            />
          </Form.Group>
          <div className='text-center'>
            <Button variant='dark' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
        <p className='text-center my-3'>
          Already have an account? <Link to='/login'>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setalert: PropTypes.func.isRequired,
  deletealert: PropTypes.func.isRequired,
  alerts: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  register,
  setalert,
  deletealert,
  loadUser,
})(Register);
