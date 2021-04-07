import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DriveBuddies from './tabs/DriveBuddies';
import JoinRequest from './tabs/JoinRequest';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DriveBuddiesTabs({ drives: { adminper } }) {
  const [key, setKey] = useState('drivebuddy');

  return (
    <div className='buddiestabs'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab
          className='tabcontainercontent'
          eventKey='drivebuddy'
          title='drive buddies'
        >
          <DriveBuddies />
        </Tab>
        {adminper === null || adminper.buddymang ? (
          <Tab
            className='tabcontainercontent'
            eventKey='request'
            title='join request'
          >
            <JoinRequest />
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
}
DriveBuddiesTabs.propTypes = {
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});
export default connect(mapStateToProps, {})(DriveBuddiesTabs);
