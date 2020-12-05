import React, { Fragment, useState } from 'react';
import { Row, Figure, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getuserprofile, closeuserprofile } from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherProfile from './OtherProfile';

function Mybuddies({
  getuserprofile,
  closeuserprofile,
  buddiess: { userloading, buddies },
}) {
  const [formData, setForm] = useState({
    profilenotchoose: false,
  });

  const { profilenotchoose } = formData;

  const handleCloseProfile = () => {
    closeuserprofile();
    setForm({ profilenotchoose: false });
  };
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
    setForm({ profilenotchoose: true });
  };
  const handleDeleteBuddy = (e) => {
    getuserprofile(e.target.value);
    setForm({ profilenotchoose: true });
  };
  const content = buddies
    .filter((buddy) => buddy.status === 'mybuddy')
    .map((buddy) => {
      return (
        <Fragment>
          <div key={buddy._id}>
            <Row>
              <Figure>
                <Figure.Image
                  width={100}
                  height={180}
                  src={buddy.avatar}
                  rounded
                />
              </Figure>
              <h4>{buddy.user.username}</h4>
              <Button
                key={buddy._id}
                value={buddy.user._id}
                size='sm'
                variant='outline-info'
                onClick={(e) => handleShowProfile(e)}
              >
                show profile
              </Button>
              <Button
                key={buddy._id}
                value={buddy.user._id}
                size='sm'
                variant='outline-info'
                onClick={(e) => handleDeleteBuddy(e)}
              >
                delete buddy
              </Button>
            </Row>
          </div>
        </Fragment>
      );
    });
  if (profilenotchoose === true && userloading === true) {
    return (
      <div>
        <Modal
          show={profilenotchoose}
          onHide={handleCloseProfile}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <OtherProfile />
          </Modal.Body>
        </Modal>
      </div>
    );
  } else {
    return <div>{content}</div>;
  }
}

Mybuddies.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getuserprofile: PropTypes.func.isRequired,
  closeuserprofile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, { getuserprofile, closeuserprofile })(
  Mybuddies
);
