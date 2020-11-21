import React, { useState, useEffect } from 'react';
import { Image, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { updateprofile, getmyprofile } from '../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Profile({
  getmyprofile,
  updateprofile,
  profile: { profile, loading },
}) {
  const [formData, setForm] = useState({
    avatar: profile.avatar,
    username: profile.user.username,
    firstname: profile.firstname,
    lastname: profile.lastname,
    studyat: profile.studyat,
    studyfield: profile.studyfield,
    publicdrives: profile.publicdrives,
    buddies: profile.buddies,
    edit: false,
    editname: 'Edit',
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
    edit,
    editname,
  } = formData;

  const onclick = (e) => {
    getmyprofile();
    let butn = '';
    edit ? (butn = 'Edit') : (butn = 'Cancel edit');
    setForm({
      avatar: profile.avatar,
      username: profile.user.username,
      firstname: profile.firstname,
      lastname: profile.lastname,
      studyat: profile.studyat,
      studyfield: profile.studyfield,
      publicdrives: profile.publicdrives,
      buddies: profile.buddies,
      edit: !edit,
      editname: butn,
    });
  };

  const onchange = (e) =>
    setForm({ ...formData, [e.target.name]: e.target.value });
  const onsubmit = (e) => {
    e.preventDefault();
    updateprofile({
      avatar,
      firstname,
      lastname,
      studyat,
      studyfield,
    });
  };

  return (
    <div className='profile'>
      {edit ? (
        <div className='profileform '>
          <h1>{username}</h1>
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

            <div className='text-center'>
              <Button variant='dark' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className='displayprofile text-center'>
          <Col xs={6} md={4}>
            <Image src={avatar} roundedCircle />
          </Col>
          <h1>{username}</h1>
          <p>
            <strong>first name: </strong>
            {firstname}
          </p>
          <p>
            <strong>last name: </strong>
            {lastname}
          </p>
          <p>
            <strong>study at: </strong>
            {studyat}
          </p>
          <p>
            <strong>study field: </strong>
            {studyfield}
          </p>
          <p>
            <strong>public drives: </strong>
            {publicdrives}
          </p>
          <p>
            <strong>buddies: </strong>
            {buddies}
          </p>
        </div>
      )}
      <Button
        className='text-center'
        variant='dark'
        onClick={(e) => onclick(e)}
      >
        {editname}
      </Button>
    </div>
  );
}

Profile.propTypes = {
  updateprofile: PropTypes.func.isRequired,
  getmyprofile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getmyprofile, updateprofile })(
  Profile
);
