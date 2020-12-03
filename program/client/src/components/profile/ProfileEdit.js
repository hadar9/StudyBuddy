import React, { useState, useEffect } from 'react';
import { Image, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  updateprofile,
  getmyprofile,
  updateprofilepictuer,
} from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileEdit({
  updateprofile,
  updateprofilepictuer,
  profiles: { profile },
}) {
  const [formData, setForm] = useState({
    avatar: profile.avatar,
    username: profile.user.username,
    firstname: profile.firstname,
    lastname: profile.lastname,
    studyat: profile.studyat,
    studyfield: profile.studyfield,
  });
  const {
    avatar,
    username,
    firstname,
    lastname,
    studyat,
    studyfield,
  } = formData;
  const onchangepic = (e) => {
    let src = e.target.files[0];
    let temp = URL.createObjectURL(src);
    setForm({ ...formData, avatar: temp });
  };

  const onsubmitpic = (e) => {
    e.preventDefault();
    updateprofilepictuer(avatar);
  };

  const onchange = (e) => {
    e.preventDefault();
    setForm({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    updateprofile({
      firstname,
      lastname,
      studyat,
      studyfield,
    });
  };

  return (
    <div>
      <Col>
        <Image className='profilepic' src={avatar} roundedCircle />
      </Col>
      <h1>{username}</h1>
      <Form onSubmit={(e) => onsubmitpic(e)}>
        <Row>
          <Form.Group>
            <Form.File
              className='position-relative'
              name='avatar'
              onChange={(e) => onchangepic(e)}
            />
          </Form.Group>
          <Button variant='dark' type='submit'>
            Upload
          </Button>
        </Row>
      </Form>
      <Form className='profileform text-center' onSubmit={(e) => onsubmit(e)}>
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
        <Button variant='dark' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

ProfileEdit.propTypes = {
  updateprofilepictuer: PropTypes.func.isRequired,
  updateprofile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profile,
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  getmyprofile,
  updateprofile,
  updateprofilepictuer,
})(ProfileEdit);
