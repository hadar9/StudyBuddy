import React, { Fragment } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import RejectReq from '../../../../navebar/search/searchdrives/operations/RejectReq';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import OtherProfile from '../../../general/buddies/tabs/OtherProfile';
import Show from '../../../general/buddies/tabs/opertaions/Show';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmrReq from '../../../../navebar/search/searchdrives/operations/ConfirmrReq';

function JoinRequest({ drives: { drive, driveloading } }) {
  const drivebuddie = drive.drivebuddies.map((buddy, index) => {
    if (buddy.status === 'request') {
      return (
        <Fragment key={index}>
          <div className='tabcontent'>
            <Row>
              <ConfirmrReq selecteduser={buddy.user._id} />
              <RejectReq selecteduser={buddy.user._id} />
              <Show selecteduser={buddy.user._id} />
              <NameAvatar
                username={buddy.user.username}
                avatar={buddy.avatar}
              />
            </Row>
          </div>
        </Fragment>
      );
    }
  });

  if (driveloading === true) {
    return <div>{drivebuddie}</div>;
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
JoinRequest.propTypes = {
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});
export default connect(mapStateToProps, {})(JoinRequest);
