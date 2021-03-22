import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

export default function SearchContact() {
  const [name, setname] = useState('');
  const name1 = name;
  const onsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='searchcontact'>
      <Form className='ml-2' onSubmit={(e) => onsubmit(e)}>
        <Form.Row className='align-items-center'>
          <Col xs='auto' className='my-3'>
            <Form.Group className='mb-2' controlId='formBasicContactSearch'>
              <Form.Control
                type='text'
                value={name1}
                placeholder='contact name'
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs='auto' className='my-3'>
            <Button className='mb-2' variant='info' type='submit'>
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
