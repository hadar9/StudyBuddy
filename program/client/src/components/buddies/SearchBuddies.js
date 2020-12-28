import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Figure, Row, Button } from 'react-bootstrap';
import {
  getuserprofile,
  addbuddy,
  confirmbuddy,
  deletebuddy,
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
    pros = searchbuddies.map((pro, index) => {
      if (pro.status === 'nothing') {
        return (
          <Fragment key={index}>
            <div>
              <Row>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handleAddBuddy(e)}
                >
                  Add buddy
                </Button>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4 className='mt-2'>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    className='ml-2'
                    width={50}
                    height={50}
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
          <Fragment key={index}>
            <div>
              <Row className='row'>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete buddy
                </Button>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4 className='mt-2'>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    width={50}
                    height={50}
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
          <Fragment key={index}>
            <div>
              <Row className='row'>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete request
                </Button>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4 className='mt-2'>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    width={50}
                    height={50}
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
          <Fragment key={index}>
            <div>
              <Row className='row'>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handledeleteBuddy(e)}
                >
                  delete request
                </Button>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handleconfirmBuddy(e)}
                >
                  confirm buddy
                </Button>
                <Button
                  className='mt-2 h-75'
                  value={pro.profile.user._id}
                  size='m'
                  variant='outline-info'
                  onClick={(e) => handleShowProfile(e)}
                >
                  show profile
                </Button>
                <h4 className='mt-2'>{pro.profile.user.username}</h4>
                <Figure>
                  <Figure.Image
                    className='ml-2'
                    width={50}
                    height={50}
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
    return <div className='searchcontent'>{pros}</div>;
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
