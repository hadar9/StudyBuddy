import React from 'react';
import { Avatar } from '@material-ui/core';
import {
  choosegroup,
  selectrecipient,
  setcurrentgroupid,
} from '../../../actions/chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function sidebarChat(props) {
  const avatar = props.avatar;
  const username = props.username;
  const choosegroup = props.choosegroup;
  const selectrecipient = props.selectrecipient;
  const setcurrentgroupid = props.setcurrentgroupid;
  async function select_chat() {
    await choosegroup(props.group_id);
    selectrecipient(username);
    setcurrentgroupid(props.group_id, props.username);
  }
  return (
    <div className='sidebarChat' onClick={select_chat}>
      <Avatar src={avatar} />
      <div className='sidebarChatInfo'>
        <p>{username}</p>
      </div>
    </div>
  );
}

sidebarChat.propTypes = {
  choosegroup: PropTypes.func.isRequired,
  selectrecipient: PropTypes.func.isRequired,
  setcurrentgroupid: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
  };
};

export default connect(mapStateToProps, {
  choosegroup,
  selectrecipient,
  setcurrentgroupid,
})(sidebarChat);
