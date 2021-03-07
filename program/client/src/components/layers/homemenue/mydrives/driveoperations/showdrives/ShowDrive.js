import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import img from '../../../../../../img/storage.png';

export default function ShowDrive({ elem }) {
  return (
    <div className='showdrive text-center'>
      <Col>
        <Image className='driveimg' src={img} />
        <p>{elem.name}</p>
      </Col>
    </div>
  );
}
