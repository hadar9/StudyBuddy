import React, { useState, useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editmessage } from '../../../../../actions/filesystem';

function GeneralMessage({
  filesystem: { folder },
  editmessage,
  drives: { adminper },
}) {
  const [editMessage, setmessage] = useState({
    edit: false,
    buttonmessage: 'Edit',
    message: folder.message,
  });
  const { edit, buttonmessage, message } = editMessage;

  const onclick = (e) => {
    let butn;
    if (edit) {
      butn = 'Edit';
    } else {
      butn = 'Cancel edit';
    }
    setmessage({
      edit: !edit,
      buttonmessage: butn,
      message: folder.message,
    });
  };

  const onchange = (e) => {
    setmessage({ ...editMessage, message: e.target.value });
  };
  const onsumbit = (e) => {
    e.preventDefault();
    editmessage(folder, message);
    setmessage({ ...editMessage, edit: !edit, buttonmessage: 'Edit' });
  };
  useEffect(() => {
    setmessage({ ...editMessage, message: folder.message });
  }, [folder]);

  return (
    <div className='generalmessage'>
      {edit && (adminper === null || adminper.editmess) ? (
        <Form onSubmit={(e) => onsumbit(e)}>
          <div>
            <Form.Group controlId='formGridmessage'>
              <Form.Control
                componentClass='textareak'
                style={{
                  height: '130px',
                  width: '800px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                }}
                placeholder={message}
                value={message}
                onChange={(e) => onchange(e)}
                maxLength='150'
              />
            </Form.Group>
          </div>
          <Button
            className='generalmessageformbutton'
            variant='dark'
            type='submit'
          >
            Save
          </Button>
        </Form>
      ) : (
        <p className='pmessage'>{message}</p>
      )}

      <Button
        className='pbutton'
        variant='dark'
        hidden={!(adminper === null || adminper.editmess)}
        onClick={(e) => onclick(e)}
      >
        {buttonmessage}
      </Button>
    </div>
  );
}
GeneralMessage.propTypes = {
  filesystem: PropTypes.object.isRequired,
  editmessage: PropTypes.func.isRequired,
  drives: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
  drives: state.drives,
});

export default connect(mapStateToProps, { editmessage })(GeneralMessage);
