import React from 'react';
import SearchDrive from './driveoperations/SearchDrive';
import CreateDrive from './driveoperations/CreateDrive';
import ShowDrives from './driveoperations/ShowDrives';

function MyDrives() {
  return (
    <div className='mydrives'>
      <h1 className='mydrives-title'>My Drives</h1>
      <div className='try'>
        <SearchDrive />
        <CreateDrive />
        <div className='showdrives '>
          <ShowDrives />
        </div>
      </div>
    </div>
  );
}

export default MyDrives;
