import React from 'react'
import store from '../../../store/store';


function ChatMessage(props) {
    var msg_cls = "chatMessage";
    if(props.msg.sender === store.getState().auth.user.username)
    {
        msg_cls = msg_cls + " chatReciever"
    }
    const content = props.msg.content;
    const name = props.msg.sender;
    const timestamp = props.msg.time;
    if(content===null || content === "")
    {
        return null;
    }

    return (
        <div>
            <p className={msg_cls}>
          <span className="chatName">{name}: </span>
          {content}
          <span className="chatTimestamp"> {timestamp} </span>
      </p>
        </div>
    )
}

export default ChatMessage
