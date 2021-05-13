import React from 'react';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
export default function Disscssion({ diss }) {
  return (
    <div>
      <Row
        style={{
          float: 'right',
          marginRight: '15px',
        }}
      >
        <h6 className='pr-5'>{diss.date}</h6>
        <NameAvatar
          username={diss.sender.username}
          avatar={diss.sender.avatar}
        />
      </Row>
      <p
        style={{
          textAlign: 'right',
          paddingTop: '60px',
          width: '100%',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
        }}
      >
        {diss.content}
      </p>
    </div>
  );
}
