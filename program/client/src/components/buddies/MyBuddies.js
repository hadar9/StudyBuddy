import React, { Fragment } from 'react';
import { Row, Figure, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherProfile from './OtherProfile';
import DeleteBud from './opertaions/DeleteBud';
import Show from './opertaions/Show';

function SentRequest({
  buddiess: { userloading, mybuddies, mybuddieslsloading },
}) {
  let content = '';

  if (mybuddieslsloading) {
    content = mybuddies.map((buddy, index) => {
      return (
        <Fragment key={index}>
          <div className='tabcontent'>
            <Row>
              <DeleteBud selecteduser={buddy.user._id} type={'Tabs'} />
              <Show selecteduser={buddy.user._id} />
              <h4 className='mt-2'>{buddy.user.username}</h4>
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

SentRequest.propTypes = {
  buddiess: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {})(SentRequest);
