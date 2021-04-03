import React, { useState } from 'react';
import Navebar from './navebar/Navebar';
import Content from './content/Content';
import Chat from './chat/Chat';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const [chatedit, setchat] = useState(false);

  return (
    <div className='home'>
      <Navebar />
      <div>
        <Content />
        <Button
          className='chat'
          variant='info'
          onClick={(e) => setchat(!chatedit)}
        >
          Chat
        </Button>
        <Modal
          show={chatedit}
          onHide={(e) => {
            setchat(false);
          }}
          backdrop='static'
          keyboard={false}
          size='lg'
        >
          <Modal.Header closeButton> </Modal.Header>
          <Modal.Body>
            <Chat />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
