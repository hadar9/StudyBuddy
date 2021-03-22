import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

export default function WriteMessage() {
  const [message, setmessage] = useState('');
  const message1 = message;
  const onsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='writemessage'>
      <Form className='ml-2' onSubmit={(e) => onsubmit(e)}>
        <Form.Row className='align-items-center'>
          <Col xs='auto' className='my-3'>
            <Form.Group className='mb-2' controlId='formBasicNewMessage'>
              <Form.Control
                type='text'
                value={message1}
                placeholder='new message'
                onChange={(e) => setmessage(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs='auto' className='my-3'>
            <Button className='mb-2' variant='info' type='submit'>
              Send
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
