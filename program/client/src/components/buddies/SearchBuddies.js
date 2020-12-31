import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Figure, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import OtherProfile from './OtherProfile';
import Add from './opertaions/Add';
import Confirm from './opertaions/Confirm';
import DeleteBud from './opertaions/DeleteBud';
import DeleteReq from './opertaions/DeleteReq';
import Show from './opertaions/Show';

function SearchBuddies({
  buddiess: { userloading, searchbuddies, searchloading },
}) {
  let pros;
  if (searchloading) {
    pros = searchbuddies.map((pro, index) => {
      if (pro.status === 'nothing') {
        return (
          <Fragment key={index}>
            <div>
              <Row>
                <Add selecteduser={pro.profile.user._id} />
                <Show selecteduser={pro.profile.user._id} />
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
                <DeleteBud
                  selecteduser={pro.profile.user._id}
                  type={'Search'}
                />
                <Show selecteduser={pro.profile.user._id} />
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
                <DeleteReq
                  selecteduser={pro.profile.user._id}
                  type={'Search'}
                />
                <Show selecteduser={pro.profile.user._id} />
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
                <DeleteReq
                  selecteduser={pro.profile.user._id}
                  type={'Search'}
                />
                <Confirm selecteduser={pro.profile.user._id} type={'Search'} />
                <Show selecteduser={pro.profile.user._id} />
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
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {})(SearchBuddies);
