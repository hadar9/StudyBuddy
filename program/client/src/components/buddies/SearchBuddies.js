import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Figure, Row, Button } from 'react-bootstrap';
import { getuserprofile } from '../../actions/buddies';
import 'bootstrap/dist/css/bootstrap.css';
import OtherProfile from './OtherProfile';

function SearchBuddies({
  getuserprofile,
  buddiess: { userloading, searchbuddies },
}) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };
  const pros = searchbuddies.map((pro) => {
    return (
      <Fragment>
        <div key={pro._id}>
          <Row>
            <Figure>
              <Figure.Image width={100} height={180} src={pro.avatar} rounded />
            </Figure>
            <h4>{pro.user.username}</h4>
            <Button
              key={pro._id}
              value={pro.user._id}
              size='sm'
              variant='outline-info'
              onClick={(e) => handleShowProfile(e)}
            >
              show profile
            </Button>
          </Row>
        </div>
      </Fragment>
    );
  });

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
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, { getuserprofile })(SearchBuddies);
