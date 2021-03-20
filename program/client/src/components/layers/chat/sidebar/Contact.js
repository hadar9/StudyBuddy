import React from 'react';
import { Image, Row } from 'react-bootstrap';
export default function Contact() {
  return (
    <div className='contact'>
      <Row className='px-4 '>
        <Image
          className='contactimg'
          src={
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
          roundedCircle
        />
        <h3>hadar</h3>
      </Row>
    </div>
  );
}
