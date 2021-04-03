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
      <Form onSubmit={(e) => onsubmit(e)}>
        <Form.Row>
          <Col className='my-2'>
            <Form.Group
              className='ml-2 w-100'
              controlId='formBasicContactSearch'
            >
              <Form.Control
                type='text'
                value={name1}
                placeholder='contact name'
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className='my-2'>
            <Button className='ml-5' variant='info' type='submit'>
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
