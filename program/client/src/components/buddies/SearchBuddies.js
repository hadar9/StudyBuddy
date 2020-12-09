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
  getprofiels,
} from '../../actions/buddies';
import 'bootstrap/dist/css/bootstrap.css';
import OtherProfile from './OtherProfile';

function SearchBuddies({
  getuserprofile,
  addbuddy,
  confirmbuddy,
  deletebuddy,
  getprofiels,
  buddiess: { userloading, searchbuddies, searchloading, searchusername },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };
  const handleAddBuddy = (e) => {
    addbuddy(e.target.value);
    getprofiels(searchusername);
  };
  const handleconfirmBuddy = (e) => {
    confirmbuddy(e.target.value);
    getprofiels(searchusername);
  };
  const handledeleteBuddy = (e) => {
    deletebuddy(e.target.value);
    getprofiels(searchusername);
  };

  let pros;
  if (searchloading) {
    pros = searchbuddies.map((pro) => {
      if (pro.status === 'nothing') {
        return (
          <Fragment>
            <div className='searchcontent' key={`1${pro.profile._id}`}>
              <Row>
                <Button
                  key={`2${pro.profile._id}`}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleAddBuddy(e)}
                >
                  Add buddy
                </Button>
                <Button
                  key={`3${pro.profile._id}`}
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
            <div className='searchcontent' key={`4${pro.profile._id}`}>
              <Row>
                <Button
                  key={`5${pro.profile._id}`}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete buddy
                </Button>
                <Button
                  key={`6${pro.profile._id}`}
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
            <div className='searchcontent' key={`7${pro.profile._id}`}>
              <Row>
                <Button
                  key={`8${pro.profile._id}`}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete request
                </Button>
                <Button
                  key={`9${pro.profile._id}`}
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
            <div className='searchcontent' key={`10${pro.profile._id}`}>
              <Row>
                <Button
                  key={`11${pro.profile._id}`}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete request
                </Button>
                <Button
                  key={`12${pro.profile._id}`}
                  value={pro.profile.user._id}
                  size='sm'
                  variant='outline-info'
                  onClick={(e) => handleconfirmBuddy(e)}
                >
                  confirm buddy
                </Button>
                <Button
                  key={`14${pro.profile._id}`}
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
  getprofiels: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {
  getuserprofile,
  addbuddy,
  confirmbuddy,
  deletebuddy,
  getprofiels,
})(SearchBuddies);
