import React from 'react';
import ChatTitle from './ChatTitle';
import WriteMessage from './WriteMessage';
import ChatContent from './ChatContent';
export default function CurrentChat() {
  return (
    <div className='currentchat'>
      <ChatTitle />
      <ChatContent />
      <WriteMessage />
    </div>
  );
}
