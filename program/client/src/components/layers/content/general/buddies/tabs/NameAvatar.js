import React from 'react';
import { Figure, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function NameAvatar({ username, avatar }) {
  return (
    <div>
      <Row>
        <h4 className='mt-2'>{username}</h4>
        <Figure>
          <Figure.Image
            className='ml-2'
            width={50}
            height={50}
            src={avatar}
            rounded
          />
        </Figure>
      </Row>
    </div>
  );
}
