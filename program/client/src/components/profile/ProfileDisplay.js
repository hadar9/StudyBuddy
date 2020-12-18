import React from 'react';
import { Image, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileDisplay({ profiles: { profile } }) {
  return (
    <div className='displayprofile text-center'>
      <Col>
        <Image className='profilepic' src={profile.avatar} roundedCircle />
      </Col>
      <h1>{profile.user.username}</h1>
      <p>
        <strong>first name: </strong>
        {profile.firstname}
      </p>
      <p>
        <strong>last name: </strong>
        {profile.lastname}
      </p>
      <p>
        <strong>study at: </strong>
        {profile.studyat}
      </p>
      <p>
        <strong>study field: </strong>
        {profile.studyfield}
      </p>
      <p>
        <strong>public drives: </strong>
        {profile.publicdrives}
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
