import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function OtherProfile({ profiles: { userprofile, userloading } }) {
  const avatar = userprofile.avatar;
  const username = userprofile.user.username;
  const firstname = userprofile.firstname;
  const lastname = userprofile.lastname;
  const publicdrives = userprofile.publicdrives;
  const studyat = userprofile.studyat;
  const studyfield = userprofile.studyfield;
  if (userloading) {
    return (
      <div className='displayprofile text-center'>
        <Col>
          <Image className='profilepic' src={avatar} roundedCircle />
        </Col>
        <h1>{username}</h1>
        <Button variant='dark' type='submit'>
          Add Buddy
        </Button>
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
      </div>
    );
  }
}

OtherProfile.propTypes = {
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profile,
});

export default connect(mapStateToProps)(OtherProfile);
