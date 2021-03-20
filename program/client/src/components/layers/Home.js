import React, { useState, useEffect } from 'react';
import Navebar from './navebar/Navebar';
import Content from './content/Content';
import Chat from './chat/Chat';
import { Modal, Button } from 'react-bootstrap';
import { getmybuddies } from '../../actions/buddies';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Home({ getmybuddies }) {
  const [chatedit, setchat] = useState(false);
  getmybuddies('mybuddy');
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
          size='xl'
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

Home.propTypes = {
  getmybuddies: PropTypes.func.isRequired,
};

export default connect(null, { getmybuddies })(Home);
