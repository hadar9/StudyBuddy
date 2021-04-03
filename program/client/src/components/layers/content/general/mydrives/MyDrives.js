import React from 'react';
import SearchDrive from './driveoperations/SearchDrive';
import CreateDrive from './driveoperations/CreateDrive';
import ShowDrives from './driveoperations/ShowDrives';
import { Row } from 'react-bootstrap';

export default function MyDrives() {
  return (
    <div className='mydrives'>
      <h1 className='mydrives-title'>My Drives</h1>
      <div className='mydrivesopreations'>
        <Row>
          <SearchDrive />
          <CreateDrive />
        </Row>
      </div>
      <div className='showdrives '>
        <ShowDrives />
      </div>
    </div>
  );
}
