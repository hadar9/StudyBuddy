import React from 'react';
import { Image, Row } from 'react-bootstrap';
export default function ChatTitle() {
  return (
    <div className='chatitle'>
      <div className='chatitlecontent'>
        <Row>
          <Image
            className='contactimg'
            src={
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            roundedCircle
          />
          <h1>hadar</h1>
        </Row>
      </div>
    </div>
  );
}
