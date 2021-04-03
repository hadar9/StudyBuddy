import React from 'react';
import CreateDrive from './driveoperations/CreateDrive';
import ShowDrives from './driveoperations/ShowDrives';
import { Row } from 'react-bootstrap';

export default function MyDrives() {
  return (
    <div className='mydrives'>
      <h1 className='mydrives-title'>My Drives</h1>
      <div className='drivesopreations'>
        <Row>
          <CreateDrive />
        </Row>
      </div>
      <div className='showdrives '>
        <ShowDrives />
      </div>
    </div>
  );
}
