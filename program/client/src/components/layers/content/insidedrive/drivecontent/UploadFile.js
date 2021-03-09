import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createfilesystem } from '../../../../../actions/filesystem';

function UploadFile({ filesystems: { filesystem }, createfilesystem }) {
  const [file, setName] = useState('');

  const onsubmit = async (e) => {
    e.preventDefault();
    createfilesystem(filesystem, file.name, 'file', file);
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
  createfilesystem: PropTypes.func.isRequired,
  filesystems: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystems: state.filesystem,
});

export default connect(mapStateToProps, { createfilesystem })(UploadFile);
