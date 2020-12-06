import React from 'react';
import { Image, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeuserprofile, addbuddy } from '../../actions/buddies';

function OtherProfile({
  closeuserprofile,
  addbuddy,
  buddies: { userprofile, userloading },
}) {
  const avatar = userprofile.avatar;
  const username = userprofile.user.username;
  const firstname = userprofile.firstname;
  const lastname = userprofile.lastname;
  const publicdrives = userprofile.publicdrives;
  const studyat = userprofile.studyat;
  const studyfield = userprofile.studyfield;

  const handleCloseProfile = () => {
    closeuserprofile();
  };
  const onclick = () => {
    addbuddy(userprofile.user);
  };

  if (userloading) {
    return (
      <div className='displayprofile text-center'>
        <Modal
          Modal
          show={true}
          onHide={handleCloseProfile}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className='text-center'>
            <Col>
              <Image className='profilepic' src={avatar} roundedCircle />
            </Col>
            <h1>{username}</h1>
            <Button onClick={(e) => onclick(e)}>add buddy</Button>
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

OtherProfile.propTypes = {
  buddies: PropTypes.object.isRequired,
  closeuserprofile: PropTypes.func.isRequired,
  addbuddy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, { closeuserprofile, addbuddy })(
  OtherProfile
);
