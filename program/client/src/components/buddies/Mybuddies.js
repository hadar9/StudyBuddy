import React, { Fragment, useState } from 'react';
import { Row, Figure, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  getuserprofile,
  closeuserprofile,
  deletebuddy,
} from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherProfile from './OtherProfile';

function MyBuddies({
  deletebuddy,
  getuserprofile,
  buddiess: { userloading, mybuddies, mybuddieslsloading },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };

  const handleDeleteBuddy = (e) => {
    deletebuddy(e.target.value);
  };
  let content = '';
  if (mybuddieslsloading) {
    content = mybuddies.map((buddy) => {
      return (
        <Fragment className='text-center'>
          <div key={buddy._id}>
            <Row>
              <Button
                key={buddy._id}
                value={buddy.user._id}
                size='sm'
                variant='outline-info'
                onClick={(e) => handleDeleteBuddy(e)}
              >
                delete buddy
              </Button>
              <Button
                key={buddy._id}
                value={buddy.user._id}
                size='sm'
                variant='outline-info'
                onClick={(e) => handleShowProfile(e)}
              >
                show profile
              </Button>
              <h4>{buddy.user.username}</h4>
              <Figure>
                <Figure.Image
                  width={100}
                  height={180}
                  src={buddy.avatar}
                  rounded
                />
              </Figure>
            </Row>
          </div>
        </Fragment>
      );
    });
  }
  if (userloading === true) {
    return (
      <div className='text-center'>
        <OtherProfile />
      </div>
    );
  } else {
    return <div>{content}</div>;
  }
}

MyBuddies.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getuserprofile: PropTypes.func.isRequired,
  closeuserprofile: PropTypes.func.isRequired,
  deletebuddy: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {
  getuserprofile,
  closeuserprofile,
  deletebuddy,
})(MyBuddies);