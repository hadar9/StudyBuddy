import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import MyBuddies from './MybBuddies';
import SentRequest from './SentRequest';
import ConfirmRequest from './ConfirmRequest';
import { getmybuddies, closemybuddies } from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function BuddiesTab({ getmybuddies, closemybuddies }) {
  const [key, setKey] = useState('mybuddy');

  const onclick = (k) => {
    setKey(k);
    closemybuddies();
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
  closemybuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, { getmybuddies, closemybuddies })(
  BuddiesTab
);
