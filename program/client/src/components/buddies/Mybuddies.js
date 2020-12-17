import React, { Fragment, useEffect, useState } from 'react';
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

function MyBuddies({
  deletebuddy,
  getuserprofile,
  getmybuddies,
  buddiess: { userloading, mybuddies, mybuddieslsloading },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };

  const HandleDeleteBuddy = async (e) => {
    deletebuddy(e.target.value);
    getmybuddies('mybuddy');
  };
  let content = '';
  if (mybuddieslsloading) {
    content = mybuddies.map((buddy) => {
      return (
        <Fragment>
          <div className='tabcontent' key={buddy._id}>
            <Row>
              <Button
                className='mt-2 h-75'
                key={buddy._id}
                value={buddy.user._id}
                size='m'
                variant='outline-info'
                onClick={(e) => HandleDeleteBuddy(e)}
              >
                delete buddy
              </Button>
              <Button
                className='mt-2 h-75'
                key={buddy._id}
                value={buddy.user._id}
                size='m'
                variant='outline-info'
                onClick={(e) => handleShowProfile(e)}
              >
                show profile
              </Button>
              <h4 className='mt-2'>{buddy.user.username}</h4>
              <Figure>
                <Figure.Image
                  className='ml-2'
                  width={50}
                  height={50}
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
  closemybuddies: PropTypes.func.isRequired,
  getmybuddies: PropTypes.func.isRequired,
  deletebuddy: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {
  getuserprofile,
  closeuserprofile,
  deletebuddy,
  closemybuddies,
  getmybuddies,
})(MyBuddies);
