import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../../../../../utils/firebase';
import file from '../../../../../txtfile/studybuddy.json';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createfolder } from '../../../../../actions/filesystem';

function CreateFolder({ filesystems: { filesystem }, createfolder }) {
  const [foldername, setName] = useState('');
  const onsubmit = async (e) => {
    e.preventDefault();
    const id = uuid();
    const DriveRef = firebase
      .storage()
      .ref(filesystem.path + `/${foldername}`)
      .child(id);
    await DriveRef.put(file);
    const folderurl = await DriveRef.getDownloadURL();
    createfolder(filesystem, foldername, folderurl);
  };
  return (
    <div>
      <Form className='mx-auto' onSubmit={(e) => onsubmit(e)}>
        <Form.Group
          className='mx-auto'
          as={Col}
          md='6'
          controlId='formGridField'
        >
          <Form.Control
            type='text'
            placeholder='Folder name'
            name='foldername'
            value={foldername}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant='dark' type='submit'>
          Create Folder
        </Button>
      </Form>
    </div>
  );
}
CreateFolder.propTypes = {
  createfolder: PropTypes.func.isRequired,
  filesystems: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystems: state.filesystem,
});

export default connect(mapStateToProps, { createfolder })(CreateFolder);
