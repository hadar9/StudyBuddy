import React from 'react';
import { Button, Image, Row } from 'react-bootstrap';
export default function Contact({ contact }) {
  return (
    <div className='contact'>
      <Row className='contactinfo'>
        <Image className='contactimg' src={contact.avatar} roundedCircle />
        <h3 style={{ paddingLeft: '18px' }}>{contact.user.username}</h3>
      </Row>
    </div>
  );
}
