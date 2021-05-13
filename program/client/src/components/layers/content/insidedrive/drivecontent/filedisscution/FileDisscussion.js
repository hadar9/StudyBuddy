import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { filedisaddmessage } from '../../../../../../actions/filesystem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Disscssion from './Disscssion';

function FileDisscussion({ elem, filedisaddmessage }) {
  const [newmessage, setmessage] = useState('');

  const disscutionNewMessage = async (e) => {
    e.preventDefault();
    await filedisaddmessage(elem, newmessage);
    setmessage('');
  };

  return (
    <div>
      <div className='discussion-history'>
        {elem.discussion.map((diss) => (
          <Disscssion key={diss._id} diss={diss} />
        ))}
      </div>
      <div className='discussion-new-mes'>
        <Form className='text-center' onSubmit={(e) => disscutionNewMessage(e)}>
          <Form.Group controlId='formBasictext'>
            <Form.Control
              type='text'
              value={newmessage}
              placeholder='new message'
              onChange={(e) => setmessage(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant='info' type='submit'>
            New Message
          </Button>
        </Form>
      </div>
    </div>
  );
}
FileDisscussion.propTypes = {
  filedisaddmessage: PropTypes.func.isRequired,
};

export default connect(null, {
  filedisaddmessage,
})(FileDisscussion);
