import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import OtherProfile from '../../content/general/buddies/tabs/OtherProfile';
import Add from '../../content/general/buddies/tabs/opertaions/Add';
import Confirm from '../../content/general/buddies/tabs/opertaions/Confirm';
import DeleteBud from '../../content/general/buddies/tabs/opertaions/DeleteBud';
import DeleteReq from '../../content/general/buddies/tabs/opertaions/DeleteReq';
import Show from '../../content/general/buddies/tabs/opertaions/Show';
import NameAvatar from '../../content/general/buddies/tabs/NameAvatar';

function SearchBuddies({ buddies: { search, searchloading, userloading } }) {
  let pros;
  if (searchloading) {
    pros = search.map((pro, index) => {
      if (pro.status === 'nothing') {
        return (
          <Fragment key={index}>
            <div>
              <Row>
                <Add selecteduser={pro.profile.user._id} />
                <Show selecteduser={pro.profile.user._id} />
                <NameAvatar
                  username={pro.profile.user.username}
                  avatar={pro.profile.user.avatar}
                />
              </Row>
            </div>
          </Fragment>
        );
      } else if (pro.status === 'mybuddy') {
        return (
          <Fragment key={index}>
            <div>
              <Row className='row'>
                <DeleteBud
                  selecteduser={pro.profile.user._id}
                  type={'Search'}
                />
                <Show selecteduser={pro.profile.user._id} />
                <NameAvatar
                  username={pro.profile.user.username}
                  avatar={pro.profile.user.avatar}
                />
              </Row>
            </div>
          </Fragment>
        );
      } else if (pro.status === 'sent') {
        return (
          <Fragment key={index}>
            <div>
              <Row className='row'>
                <DeleteReq
                  selecteduser={pro.profile.user._id}
                  type={'Search'}
                />
                <Show selecteduser={pro.profile.user._id} />
                <NameAvatar
                  username={pro.profile.user.username}
                  avatar={pro.profile.user.avatar}
                />
              </Row>
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment key={index}>
            <div>
              <Row className='row'>
                <DeleteReq
                  selecteduser={pro.profile.user._id}
                  type={'Search'}
                />
                <Confirm selecteduser={pro.profile.user._id} type={'Search'} />
                <Show selecteduser={pro.profile.user._id} />
                <NameAvatar
                  username={pro.profile.user.username}
                  avatar={pro.profile.user.avatar}
                />
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
  buddies: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});
export default connect(mapStateToProps, {})(SearchBuddies);
