import React, { useState } from 'react';
import { Image, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setForm] = useState({
    avatar: 'holder.js/171x180',
    username: 'hadar',
    firstname: '',
    lastname: '',
    studyat: '',
    studyfield: '',
    publicdrives: [],
    buddies: [],
  });
  const {
    avatar,
    username,
    firstname,
    lastname,
    studyat,
    studyfield,
    publicdrives,
    buddies,
  } = formData;

  const onchange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });
  const onsubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className='profile'>
      <Col xs={6} md={4}>
        <Image src={avatar} roundedCircle />
      </Col>

      <Form onSubmit={(e) => onsubmit(e)}>
        <Form.Group>
          <Form.File 
            className='position-relative'
            name='avatar'
            onChange={(e) => onchange(e)}
          />
        </Form.Group>

        <h1>{username}</h1>
        <Form.Row>
          <Form.Group as={Col} md='4' controlId='formBasicFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='First Name'
              name='firstname'
              value={firstname}
              onChange={(e) => onchange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='formBasicLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Last Name'
              name='lastname'
              value={lastname}
              onChange={(e) => onchange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group as={Col} md='4' controlId='formGridStudyAt'>
          <Form.Label>Study at</Form.Label>
          <Form.Control
            type='text'
            placeholder='Study at'
            name='studyat'
            value={studyat}
            onChange={(e) => onchange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} md='4' controlId='formGridField'>
          <Form.Label>Study Field</Form.Label>
          <Form.Control
            type='text'
            placeholder='Study field'
            name='studyfield'
            value={studyfield}
            onChange={(e) => onchange(e)}
          />
        </Form.Group>

        <div className='text-center'>
          <Button variant='dark' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default Login;
