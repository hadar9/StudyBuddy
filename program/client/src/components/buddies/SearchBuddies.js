import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Figure, Row, Button } from 'react-bootstrap';
import {
  getuserprofile,
  addbuddy,
  confirmbuddy,
  deletebuddy,
  closeprofiles,
} from '../../actions/buddies';
import 'bootstrap/dist/css/bootstrap.css';
import OtherProfile from './OtherProfile';

function SearchBuddies({
  getuserprofile,
  addbuddy,
  confirmbuddy,
  deletebuddy,
  buddiess: { userloading, searchbuddies, searchloading },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };
  const handleAddBuddy = (e) => {
    addbuddy(e.target.value);
  };
  const handleconfirmBuddy = (e) => {
    confirmbuddy(e.target.value);
  };
  const handledeleteBuddy = (e) => {
    deletebuddy(e.target.value);
  };

  let pros;
  if (searchloading) {
    pros = searchbuddies.map((pro) => {
      if (pro.status === 'nothing') {
        return (
          <Fragment>
            <div className='searchcontent' key={pro.profile._id}>
              <Row>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleAddBuddy(e)}
                >
                  Add buddy
                </Button>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    width={100}
                    height={180}
                    src={pro.profile.avatar}
                    rounded
                  />
                </Figure>
              </Row>
            </div>
          </Fragment>
        );
      } else if (pro.status === 'mybuddy') {
        return (
          <Fragment>
            <div className='searchcontent' key={pro.profile._id}>
              <Row>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete buddy
                </Button>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    width={100}
                    height={180}
                    src={pro.profile.avatar}
                    rounded
                  />
                </Figure>
              </Row>
            </div>
          </Fragment>
        );
      } else if (pro.status === 'sent') {
        return (
          <Fragment>
            <div className='searchcontent' key={pro.profile._id}>
              <Row>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete request
                </Button>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    width={100}
                    height={180}
                    src={pro.profile.avatar}
                    rounded
                  />
                </Figure>
              </Row>
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <div className='searchcontent' key={pro.profile._id}>
              <Row>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete request
                </Button>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleconfirmBuddy(e)}
                >
                  confirm buddy
                </Button>
                <Button
                  key={pro.profile._id}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    width={100}
                    height={180}
                    src={pro.profile.avatar}
                    rounded
                  />
                </Figure>
              </Row>
            </div>
          </Fragment>
        );
      }
    });
  }

  if (userloading === true) {
    return (
      <div>
        <OtherProfile />
      </div>
    );
  } else {
    return <div>{pros}</div>;
  }
}

SearchBuddies.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getuserprofile: PropTypes.func.isRequired,
  addbuddy: PropTypes.func.isRequired,
  confirmbuddy: PropTypes.func.isRequired,
  deletebuddy: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {
  getuserprofile,
  addbuddy,
  confirmbuddy,
  deletebuddy,
})(SearchBuddies);
