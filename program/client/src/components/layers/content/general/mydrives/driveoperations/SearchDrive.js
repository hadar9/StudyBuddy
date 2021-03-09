import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
export default function SearchDrive() {
  const onchange = (e) => {};

  const onsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='mx-auto'>
      <Form onSubmit={(e) => onsubmit(e)}>
        <Form.Row>
          <Form.Group
            className='mx-auto'
            as={Col}
            md='5'
            controlId='formGridField'
          >
            <Form.Control
              type='text'
              placeholder='drive name'
              name='driveername'
              value={''}
              onChange={(e) => onchange(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Button variant='info' className='mb-3' size='m' type='submit'>
            Search drive
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
}
