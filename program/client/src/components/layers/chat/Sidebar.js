import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../../store/store';
import { leavegroup, findgroups } from '../../../actions/chat';

function Sidebar({leavegroup, findgroups, chat: { groups, messages, current_group } }) {
  
  const user = store.getState().auth.user;
  useEffect(() => {
    findgroups(user);
  }, []);

  var chat_groups = [];
  for (var i in groups) {
    chat_groups.push(groups[i]);
  }
  return (
    <div className='chatSidebar'>
      <div className='sidebarHeader'>
        <Row className='mt-3'>
          
          <div className='sidebarRight'>
            <h3>My Avatar:</h3>

            <Avatar className='chatavatarheader' src={store.getState().auth.user.avatar} />
          </div>
        </Row>
      </div>
      <div className='sidebarSearch'>
        <div className='sidebarSearchContainter'>
        </div>
      </div>
      <div className='sidebarChats'>
        { groups ? 
        chat_groups.map((name) => (
          <SidebarChat username={name[1]} group_id={name[2]} avatar={name[3]} />
        )): null}
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

export default connect(mapStateToProps, { leavegroup, findgroups })(Sidebar);
