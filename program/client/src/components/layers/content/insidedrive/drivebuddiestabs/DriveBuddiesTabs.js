import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DriveBuddies from './tabs/DriveBuddies';
import JoinRequest from './tabs/JoinRequest';

export default function DriveBuddiesTabs() {
  const [key, setKey] = useState('drivebuddy');

  const onclick = (k) => {
    setKey(k);
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
          eventKey='drivebuddy'
          title='drive buddies'
        >
          <DriveBuddies />
        </Tab>
        <Tab
          className='tabcontainercontent'
          eventKey='request'
          title='join request'
        >
          <JoinRequest />
        </Tab>
      </Tabs>
    </div>
  );
}
