import React, { useState, useEffect } from 'react';
import { creategroup, adduser } from '../../../../../actions/chat';
import { getchatgroups } from '../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../../../../store/store';
import { Button, Form, Row, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import chat1 from '../../../../../img/chat1.png';
import chat3 from '../../../../../img/chat3.png';
function ChatGroups({
  creategroup,
  getchatgroups,
  adduser,
  drives: { adminper },
}) {
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState(null);
  const user_id = store.getState().auth.user._id;
  const username = store.getState().auth.user.username;
  const drive_id = store.getState().drives.drive._id;
  const drive = store.getState().drives.drive;

  const button_cb = async (e) => {
    e.preventDefault();
    if (input && user_id && username && drive_id) {
      creategroup(input, user_id, username, drive_id);
    } else {
      console.log('ERROR in ChatGroups component');
    }

    setInput('');
  };

  function enterchat(data) {
    data = data.split(',');
    var grps = store.getState().chat.groups;
    for (var g in grps) {
      if (grps[g][1] === data[1]) {
        setAlert(
          <div class='alert alert-danger alert-dismissible'>
            <a href='#' class='close' data-dismiss='alert' aria-label='close'>
              &times;
            </a>
            You're already in {data[1]}.
          </div>
        );
        return;
      }
    }
    adduser(data[0], user_id, username);
    setAlert(
      <div class='alert alert-success alert-dismissible'>
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>
          &times;
        </a>
        You've joined {data[1]} chat!
      </div>
    );
  }

  useEffect(() => {
    getchatgroups(drive_id);
    const groups = store.getState().drives.chatgroups;
  }, []);

  return (
    <div className='createGroup'>
      {alert}
      <h1 className='drivegroupchat-title'>Chats Groups</h1>
      {adminper === null || adminper.createchat ? (
        <div className='chatgroupsform'>
          <Form onSubmit={(e) => button_cb(e)}>
            <Form.Row>
              <Form.Group controlId='formGridField'>
                <Form.Control
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Enter group name'
                  type='text'
                  required={true}
                  className=' mr-4 w-75'
                />
              </Form.Group>
              <Button variant='info' className='mb-3' type='submit'>
                Create group
              </Button>
            </Form.Row>
          </Form>
        </div>
      ) : null}
      <div className='joinchats'>
        {store.getState().drives.chatgroups
          ? store.getState().drives.chatgroups.map((data) => (
              <Row className='joinchat'>
                <Button
                  variant='light'
                  value={data}
                  onClick={(e) => enterchat(e.target.value)}
                >
                  <Image className='chatimg' title={data[1]} src={chat3} />
                </Button>
                <p className='mx-auto'>{data[1]}</p>
              </Row>
            ))
          : null}
      </div>
    </div>
  );
}

ChatGroups.propTypes = {
  creategroup: PropTypes.func.isRequired,
  getchatgroups: PropTypes.func.isRequired,
  adduser: PropTypes.func.isRequired,
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});
export default connect(mapStateToProps, {
  creategroup,
  getchatgroups,
  adduser,
})(ChatGroups);
