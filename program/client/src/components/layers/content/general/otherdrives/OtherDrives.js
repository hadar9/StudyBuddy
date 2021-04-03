import React from 'react';
import SearchDrive from '../mydrives/driveoperations/SearchDrive';
import ShowDrives from '../mydrives/driveoperations/ShowDrives';
import { Row } from 'react-bootstrap';

export default function OtherDrives() {
  return (
    <div className='mydrives'>
      <h1 className='mydrives-title'>Other Drives</h1>
      <div className='mydrivesopreations'>
        <Row>
          <SearchDrive />
        </Row>
      </div>
      <div className='showdrives '>
        <ShowDrives />
      </div>
    </div>
  );
}
