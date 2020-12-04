import React from 'react';
import { Image, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileDisplay({ profiles: { profile } }) {
  const avatar = profile.avatar;
  const username = profile.user.username;
  const firstname = profile.firstname;
  const lastname = profile.lastname;
  const publicdrives = profile.publicdrives;
  const studyat = profile.studyat;
  const studyfield = profile.studyfield;

  console.log(avatar);
  return (
    <div className='displayprofile text-center'>
      <Col>
        <Image className='profilepic' src={avatar} roundedCircle />
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
    </div>
  );
}

ProfileDisplay.propTypes = {
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profile,
});

export default connect(mapStateToProps)(ProfileDisplay);
