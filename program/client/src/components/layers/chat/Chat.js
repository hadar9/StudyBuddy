import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
  Message,
  SearchOutlined,
  SettingsInputAntenna,
} from '@material-ui/icons';
import { send } from '../../../actions/chat';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InnerBody from './InnerBody';

function Chat({
  send,
  chat: { messages, recipient, current_group },
  auth: { user },
}) {
  const [input, setInput] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();
    send(current_group, user.username, input);

    setInput('');
  };

  return (
    <div className='chat_right'>
      <div className='chatHeader'>
        <Avatar src='' />
        <div className='chatHeaderInfo'>
          <h3>Room Name</h3>
          <IconButton>
            <SearchOutlined />
          </IconButton>
        </div>
      </div>
      <div className='chatInnerBody'>
        {messages.messages ? <InnerBody messages={messages.messages} /> : null}
      </div>
      <div className='chatFooter'>
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'></button>
        </form>
      </div>
    </div>
  );
}
Chat.propTypes = {
  send: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
});
export default connect(mapStateToProps, { send })(Chat);
