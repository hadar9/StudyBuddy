import React, { useEffect, useState } from 'react';
import Chat from './components/layers/chat/Chat'
import Sidebar from './components/layers/chat/Sidebar'
import Pusher from 'pusher-js';

import { choosegroup} from './actions/chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store/store';




function ChatApp({choosegroup, auth: {users}}) {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    const pusher = new Pusher('15ee8a2632b6c33c4e5b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messageEvent');
    channel.bind('event', function(newMessage) {
      setMessages([...messages, newMessage])
      
      if(store.getState().chat.current_group){
        choosegroup(store.getState().chat.current_group);
      }
      
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);



    return (
        <div className="chatApp">
            My Chat App
            <div className="chatBody">
                <Sidebar/>
                <Chat messages={messages}/>   
            </div>
        </div>
    )
}

ChatApp.propTypes = {
  choosegroup: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {choosegroup})(ChatApp);

