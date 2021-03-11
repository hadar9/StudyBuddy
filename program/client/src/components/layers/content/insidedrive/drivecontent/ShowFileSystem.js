import React from 'react';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function ShowFileSystem({ folder, folderloading }) {
  let myfilesystem;
  if (folder.children.length > 0) {
    myfilesystem = folder.children.map((elem) => (
      <Row>
        <ShowSystem key={elem.id} elem={elem} />
      </Row>
    ));
  }

  return <div>{folderloading ? <div>{myfilesystem}</div> : null}</div>;
}
