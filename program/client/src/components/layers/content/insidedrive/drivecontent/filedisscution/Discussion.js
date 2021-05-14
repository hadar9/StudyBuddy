import React, { useState, useEffect } from 'react';
import { Row, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteUserDiss,
  editUserDiss,
} from '../../../../../../actions/filesystem';

function Discussion({
  elem,
  diss,
  drives: { adminper },
  auth: { user },
  deleteUserDiss,
  editUserDiss,
}) {
  const [editdiss, setmessage] = useState({
    edit: false,
    newmessage: diss.content,
  });
  const { edit, newmessage } = editdiss;

  const deleteUserDiscussion = (e) => {
    deleteUserDiss(elem, diss);
  };
  const editUserDiscussion = (e) => {
    editUserDiss(elem, diss, newmessage);
    setmessage({ ...editdiss, edit: false });
  };

  return (
    <div className='discussion'>
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
      {edit ? (
        <Form className='text-center' onSubmit={(e) => editUserDiscussion(e)}>
          <Form.Group controlId='formBasictext'>
            <Form.Control
              type='text'
              value={newmessage}
              placeholder='new message'
              onChange={(e) =>
                setmessage({ ...editdiss, newmessage: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button variant='info' type='submit'>
            Save
          </Button>
        </Form>
      ) : (
        <div>
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
          {adminper === null || diss.sender._id === user._id ? (
            <div>
              <Button
                variant='info'
                type='click'
                onClick={(e) => setmessage({ ...editdiss, edit: true })}
              >
                Edit
              </Button>
              <Button
                variant='info'
                type='click'
                onClick={(e) => deleteUserDiscussion(e)}
              >
                delete
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
Discussion.propTypes = {
  drives: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUserDiss: PropTypes.func.isRequired,
  editUserDiss: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drives: state.drives,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUserDiss, editUserDiss })(
  Discussion
);
