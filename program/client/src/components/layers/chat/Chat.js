import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
  Message,
  SearchOutlined,
  SettingsInputAntenna,
} from '@material-ui/icons';
import { send, findgroups, leavegroup  } from '../../../actions/chat';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InnerBody from './InnerBody';
import store from '../../../store/store';



function Chat({
  send, findgroups, leavegroup,
  chat: { messages, current_group },
  auth: { user },
}) {
  const [input, setInput] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();
    send(current_group.id, user.username, input);

    setInput('');
  };
  var is_private = true;
  if(store.getState().chat.current_group && store.getState().chat.current_group.group_name === "")
  {
    is_private = false;
  }
  else
  {
    is_private = true;
  }
  let group;
  useEffect((group) => {
    group = store.getState().chat.current_group;

  }, []);

  async function exitgroup()
  {
    await leavegroup(user, store.getState().chat.current_group._id);
    findgroups(user);
  }

  return (
    <div className='chat_right '>
      <div className='chatHeader '>
        <div>
        </div>
        <div className='chatHeaderInfo'>
          {console.log(store.getState().chat)}
          <h3>{group ? (group.group_name
           ? group.group_name : group.recipient): null}</h3>
          {is_private == true ? <button type="button" class="btn btn-secondary" onClick={exitgroup} >Exit Group</button> : null}
        </div>
      </div>
      <div className='chatInnerBody'>
        {messages ? <InnerBody messages={messages.messages} /> : null}
      </div>
      <div className='chatFooter'>
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            {' '}
          </button>
        </form>
      </div>
    </div>
  );
};
Chat.propTypes = {
  send: PropTypes.func.isRequired,
  findgroups: PropTypes.func.isRequired,
  leavegroup: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
});

export default connect(mapStateToProps, { send, findgroups, leavegroup })(Chat);
