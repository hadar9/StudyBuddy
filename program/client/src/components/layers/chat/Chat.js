import React from 'react';
import SideBar from './sidebar/SideBar';
import CurrentChat from './currentchat/CurrentChat';

export default function Chat() {
  return (
    <div className='chatc'>
      <SideBar />
      <CurrentChat />
    </div>
  );
}
