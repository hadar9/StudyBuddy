import React from 'react';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
export default function DriveBuddies({ drivebuddies }) {
  const buddies = drivebuddies.map((buddy) => (
    <div>
      <NameAvatar
        key={buddy._id}
        username={buddy.profile.user.username}
        avatar={buddy.profile.avatar}
      />
      <Form>
        <Form.Group>
          <Row>
            <Col>
              <Form.Check
                type='checkbox'
                label='watch content'
                name='formHorizontalwatchcontentbuddy'
                id='formHorizontalwatchcontentbuddy'
                checked={buddy.perrmission.watch}
              />
            </Col>
            <Col>
              <Form.Check
                type='checkbox'
                label='download content'
                name='formHorizontaldownloadcontentbuddy'
                id='formHorizontaldownloadcontentbuddy'
                checked={buddy.perrmission.download}
              />
            </Col>
            <Button variant='primary' type='submit'>
              Save
            </Button>
          </Row>
        </Form.Group>
      </Form>
    </div>
  ));
  return <div>{buddies !== null ? buddies : null}</div>;
}
