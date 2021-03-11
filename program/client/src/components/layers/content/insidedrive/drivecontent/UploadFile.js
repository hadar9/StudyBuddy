import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createfile } from '../../../../../actions/filesystem';

function UploadFile({ folder, createfile }) {
  const [newfile, setName] = useState('');

  const onsubmit = async (e) => {
    e.preventDefault();
    createfile(folder, newfile.name, newfile);
    setName('');
  };

  return (
    <div>
      <Form className='mx-auto' onSubmit={(e) => onsubmit(e)}>
        <Form.Row>
          <Form.Group>
            <Form.File
              className='mx-auto'
              name='file'
              onChange={(e) => setName(e.target.files[0])}
            />
          </Form.Group>
          <Button variant='info' className='mb-3' size='m' type='submit'>
            Upload File
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
}
UploadFile.propTypes = {
  createfile: PropTypes.func.isRequired,
};

export default connect(null, { createfile })(UploadFile);
