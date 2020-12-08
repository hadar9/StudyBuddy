import React, { Fragment, useState, useEffect } from 'react';
import { Row, Figure, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  getuserprofile,
  closeuserprofile,
  deletebuddy,
  getmybuddies,
  closemybuddies,
} from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherProfile from './OtherProfile';

function SentRequest({
  deletebuddy,
  getuserprofile,
  closemybuddies,
  buddiess: { userloading, mybuddies, mybuddieslsloading },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };

  const handleDeleteBuddy = (e) => {
    deletebuddy(e.target.value);
    getmybuddies('sent');
  };

  let content = '';
  if (mybuddieslsloading) {
    content = mybuddies.map((buddy) => {
      return (
        <Fragment>
          <div className='tabcontent' key={`1+${buddy._id}`}>
            <Row>
              <Button
                key={`3+${buddy._id}`}
                value={buddy.user._id}
                size='sm'
                variant='outline-info'
                onClick={(e) => handleDeleteBuddy(e)}
              >
                delete request
              </Button>
              <Button
                key={`2+${buddy._id}`}
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

SentRequest.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getuserprofile: PropTypes.func.isRequired,
  closeuserprofile: PropTypes.func.isRequired,
  deletebuddy: PropTypes.func.isRequired,
  closemybuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {
  getuserprofile,
  closeuserprofile,
  deletebuddy,
  closemybuddies,
})(SentRequest);
