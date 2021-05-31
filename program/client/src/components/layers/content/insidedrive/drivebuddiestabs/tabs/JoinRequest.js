import React, { Fragment } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import RejectReq from '../../../../navebar/search/searchdrives/operations/RejectReq';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import Show from '../../../general/buddies/tabs/opertaions/Show';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmrReq from '../../../../navebar/search/searchdrives/operations/ConfirmrReq';

function JoinRequest({ drives: { drive, driveloading } }) {
  if(typeof drive.drivebuddies === "undefined")
  {
    return null;
  }
  if(typeof drive.drivebuddies === "undefined")
  {
    return null;
  }
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
                avatar={buddy.user.avatar}
              />
            </Row>
          </div>
        </Fragment>
      );
    } else return null;
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
