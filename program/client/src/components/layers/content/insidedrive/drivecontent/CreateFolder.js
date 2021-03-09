import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createfolder } from '../../../../../actions/filesystem';

function CreateFolder({ filesystems: { filesystem }, createfolder }) {
  const [foldername, setName] = useState('');
  const onsubmit = async (e) => {
    e.preventDefault();
    createfolder(filesystem, foldername);
  };
  return (
    <div>
      <Form className='mx-auto' onSubmit={(e) => onsubmit(e)}>
        <Form.Row>
          <Form.Group
            className='mx-auto'
            as={Col}
            md='5'
            controlId='formGridField'
          >
            <Form.Control
              type='text'
              placeholder='Folder name'
              name='foldername'
              value={foldername}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Button variant='info' className='mb-3' size='m' type='submit'>
            Create Folder
          </Button>
        </Form.Row>
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
