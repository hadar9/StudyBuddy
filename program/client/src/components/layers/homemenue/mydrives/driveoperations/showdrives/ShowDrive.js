import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import img from '../../../../../../img/storage.png';

export default function ShowDrive({ elem }) {
  return (
    <div className='showdrive text-center'>
      <Col>
        <Button variant='light'>
          <Image className='driveimg' src={img} />
        </Button>
        <p>{elem.name}</p>
      </Col>
    </div>
  );
}
