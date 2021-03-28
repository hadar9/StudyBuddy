import React from 'react';
import SideBar from './sidebar/SideBar';
import CurrentChat from './currentchat/CurrentChat';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

socket.on('sendmessage', (data) => {
});

export default function Chat() {
  return (
    <div className='chatc'>
      <SideBar />
      <CurrentChat />
    </div>
  );
}
