import React, { useEffect } from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../../store/store';
import { findgroups, leavegroup } from '../../../actions/chat';

function Sidebar({ findgroups, leavegroup, chat: { groups, messages } }) {
  
  const user = store.getState().auth.user;
  useEffect(() => {
    findgroups(user);
  }, []);
  async function exitgroup()
  {
    const current_group = store.getState().chat.current_group;
    if(user && current_group)
    {
      await leavegroup(user, current_group);
      findgroups(user);
      
    }
    
  }

  var chat_groups = [];
  for (var i in groups) {
    chat_groups.push(groups[i]);
  }
  return (
    <div className='chatSidebar'>
      <div className='sidebarHeader'>
        <Row className='mt-3'>
          <Avatar className='chatavatarheader' src='' />
          <div className='sidebarRight '>
            <IconButton>
              <DonutLargeIcon />
            </IconButton>

            <IconButton>
              <ChatIcon />
            </IconButton>

            <IconButton>
              <MoreVertIcon onClick={exitgroup}/>
            </IconButton>
          </div>
        </Row>
      </div>
      <div className='sidebarSearch'>
        <div className='sidebarSearchContainter'>
          <SearchOutlined />
          <input placeholder='Search or start new chat' />
        </div>
      </div>
      <div className='sidebarChats'>
        {chat_groups.map((name) => (
          <SidebarChat username={name[1]} group_id={name[2]} />
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  findgroups: PropTypes.func.isRequired,
  leavegroup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chat: state.chat,
  };
};

export default connect(mapStateToProps, { findgroups, leavegroup })(Sidebar);
