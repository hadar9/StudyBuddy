import React from 'react';
import { Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
function Disscssion({ diss, drives: { adminper }, auth: { user } }) {
  return (
    <div className='discussion'>
      <Row
        style={{
          float: 'right',
          marginRight: '15px',
        }}
      >
        <h6 className='pr-5'>{diss.date}</h6>
        <NameAvatar
          username={diss.sender.username}
          avatar={diss.sender.avatar}
        />
      </Row>
      <p
        style={{
          textAlign: 'right',
          paddingTop: '60px',
          width: '100%',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
        }}
      >
        {diss.content}
      </p>
      {adminper === null || diss.sender._id === user._id ? (
        <div>
          <Button variant='info' type='click'>
            Edit
          </Button>
          <Button variant='info' type='click'>
            delete
          </Button>
        </div>
      ) : null}
    </div>
  );
}
Disscssion.propTypes = {
  drives: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  drives: state.drives,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Disscssion);
