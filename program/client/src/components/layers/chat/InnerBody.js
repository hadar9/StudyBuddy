import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

export default function InnerBody({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mess = messages.map((msg) => <ChatMessage key={msg._id} msg={msg} />);
  return (
    <div>
      {mess}
      <div ref={messagesEndRef} />
    </div>
  );
}
