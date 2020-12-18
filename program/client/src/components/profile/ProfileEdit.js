import React, { useState } from 'react';
import { Image, Form, Button, Col } from 'react-bootstrap';
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
    setForm({ ...formData, avatar: e.target.value });
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
      <Form className='mx-auto' onSubmit={(e) => onsubmitpic(e)}>
        <Form.Group>
          <Form.File
            className='mx-auto'
            name='avatar'
            onChange={(e) => onchangepic(e)}
          />
        </Form.Group>
        <Button variant='dark' type='submit'>
          Upload
        </Button>
      </Form>
      <Form className='mx-auto' onSubmit={(e) => onsubmit(e)}>
        <Form.Group
          className='mx-auto'
          as={Col}
          sm='6'
          controlId='formBasicFirstName'
        >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            name='firstname'
            value={firstname}
            onChange={(e) => onchange(e)}
          />
        </Form.Group>
        <Form.Group
          className='mx-auto'
          as={Col}
          md='6'
          controlId='formBasicLastName'
        >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last Name'
            name='lastname'
            value={lastname}
            onChange={(e) => onchange(e)}
          />
        </Form.Group>
        <Form.Group
          className='mx-auto'
          as={Col}
          md='6'
          controlId='formGridStudyAt'
        >
          <Form.Label>Study at</Form.Label>
          <Form.Control
            type='text'
            placeholder='Study at'
            name='studyat'
            value={studyat}
            onChange={(e) => onchange(e)}
          />
        </Form.Group>
        <Form.Group
          className='mx-auto'
          as={Col}
          md='6'
          controlId='formGridField'
        >
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
