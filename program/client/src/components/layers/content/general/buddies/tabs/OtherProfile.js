import React from 'react';
import { Image, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeuserprofile } from '../../../../../../actions/buddies';

function OtherProfile({
  closeuserprofile,
  buddies: { userprofile, userloading },
}) {
  const handleCloseProfile = () => {
    closeuserprofile();
  };

  if (userloading) {
    return (
      <div className='displayprofile text-center'>
        <Modal
          show={true}
          onHide={handleCloseProfile}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className='text-center'>
            <Col>
              <Image
                className='profilepic'
                src={userprofile.avatar}
                roundedCircle
              />
            </Col>
            <h1>{userprofile.user.username}</h1>

            <p>
              <strong>first name: </strong>
              {userprofile.firstname}
            </p>
            <p>
              <strong>last name: </strong>
              {userprofile.lastname}
            </p>
            <p>
              <strong>study at: </strong>
              {userprofile.studyat}
            </p>
            <p>
              <strong>study field: </strong>
              {userprofile.studyfield}
            </p>
            <p>
              <strong>public drives: </strong>
              {userprofile.publicdrives}
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
};

const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, { closeuserprofile })(OtherProfile);
