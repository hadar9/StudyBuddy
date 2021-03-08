import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import ShowFileSystem from './ShowFileSystem';

export default function DriveContent() {
  return (
    <div>
      <UploadFile />
      <CreateFolder />
      <ShowFileSystem />
    </div>
  );
}
