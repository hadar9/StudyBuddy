import React, { Fragment, useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import MyBuddies from './MyBuddies';
import SentRequest from './SentRequest';
import ConfirmRequest from './ConfirmRequest';
import { getmybuddies, closeprofiles } from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function BuddiesTab({ getmybuddies, closeprofiles }) {
  const [key, setKey] = useState('mybuddy');

  const onclick = (k) => {
    setKey(k);
    getmybuddies(k);
  };

  return (
    <div className='buddiestabs'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => onclick(k)}
      >
        <Tab
          className='tabcontainercontent'
          eventKey='mybuddy'
          title='My buddies'
        >
          <MyBuddies />
        </Tab>
        <Tab
          className='tabcontainercontent'
          eventKey='sent'
          title='Sent request'
        >
          <SentRequest />
        </Tab>
        <Tab
          className='tabcontainercontent'
          eventKey='request'
          title='Buddy request'
        >
          <ConfirmRequest />
        </Tab>
      </Tabs>
    </div>
  );
}
BuddiesTab.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getmybuddies: PropTypes.func.isRequired,
  closeprofiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, { getmybuddies, closeprofiles })(
  BuddiesTab
);
