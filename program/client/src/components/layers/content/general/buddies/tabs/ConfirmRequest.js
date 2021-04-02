import React, { Fragment } from 'react';
import { Row, Figure, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherProfile from './OtherProfile';
import DeleteReq from './opertaions/DeleteReq';
import Show from './opertaions/Show';
import Confirm from './opertaions/Confirm';
import NameAvatar from './NameAvatar';

function ConfirmRequest({
  buddiess: { userloading, mybuddies, mybuddieslsloading },
}) {
  let content = '';
  if (mybuddieslsloading) {
    content = mybuddies.map((buddy, index) => {
      return (
        <Fragment key={index}>
          <div className='tabcontent'>
            <Row>
              <DeleteReq
                selecteduser={buddy.user._id}
                type={'Tabs'}
                reqtype={'request'}
              />
              <Confirm selecteduser={buddy.user._id} type={'Tabs'} />
              <Show selecteduser={buddy.user._id} />
              <NameAvatar
                username={buddy.user.username}
                avatar={buddy.user.avatar}
              />
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
  } else if (mybuddieslsloading === true) {
    return <div>{content}</div>;
  } else {
    return (
      <div>
        <Spinner
          size='lg'
          className='tabbudspinner'
          animation='border'
          variant='info'
        />
      </div>
    );
  }
}

ConfirmRequest.propTypes = {
  buddiess: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {})(ConfirmRequest);
