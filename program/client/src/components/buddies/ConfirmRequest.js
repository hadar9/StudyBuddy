import React, { Fragment } from 'react';
import { Row, Figure, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  getuserprofile,
  deletebuddy,
  confirmbuddy,
  getmybuddies,
} from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherProfile from './OtherProfile';

function ConfirmRequest({
  deletebuddy,
  getuserprofile,
  confirmbuddy,
  getmybuddies,
  buddiess: { userloading, mybuddies, mybuddieslsloading },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };
  const handleConfimBuddy = (e) => {
    confirmbuddy(e.target.value);
    getmybuddies('request');
  };

  const handleDeleteBuddy = (e) => {
    deletebuddy(e.target.value);
    getmybuddies('request');
  };
  let content = '';
  if (mybuddieslsloading) {
    content = mybuddies.map((buddy,index) => {
      return (
        <Fragment key={index}>
          <div className='tabcontent'>
            <Row>
              <Button
                className='mt-2 h-75'
      
                value={buddy.user._id}
                size='m'
                variant='outline-info'
                onClick={(e) => handleDeleteBuddy(e)}
              >
                delete buddy
              </Button>

              <Button
                className='mt-2 h-75'
              
                value={buddy.user._id}
                size='m'
                variant='outline-info'
                onClick={(e) => handleConfimBuddy(e)}
              >
                confim buddy
              </Button>
              <Button
                className='mt-2 h-75'
             
                value={buddy.user._id}
                size='m'
                variant='outline-info'
                onClick={(e) => handleShowProfile(e)}
              >
                show profile
              </Button>
              <h5 className='mt-2'>{buddy.user.username}</h5>
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

ConfirmRequest.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getuserprofile: PropTypes.func.isRequired,
  deletebuddy: PropTypes.func.isRequired,
  confirmbuddy: PropTypes.func.isRequired,
  getmybuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {
  getuserprofile,
  deletebuddy,
  confirmbuddy,
  getmybuddies,
})(ConfirmRequest);
