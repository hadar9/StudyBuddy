import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createfile } from '../../../../../actions/filesystem';

function UploadFile({
  filesystem: { folder, fileopstatus, fileop },
  createfile,
}) {
  const [newfile, setName] = useState('');

  const onsubmit = async (e) => {
    e.preventDefault();
    createfile(folder, newfile.name, newfile);
    setName('');
  };

  return (
    <div className='mr-5'>
      {fileopstatus && fileop === 'upload' ? (
        <Spinner
          className='filespinner'
          animation='border'
          variant='info'
          style={{ marginTop: '230px' }}
        ></Spinner>
      ) : null}
      <Form className='mx-auto' onSubmit={(e) => onsubmit(e)}>
        <Form.Row>
          <Form.Group>
            <Form.File
              className='mx-auto'
              name='file'
              onChange={(e) => setName(e.target.files[0])}
              required
            />
          </Form.Group>
          <Button
            variant='info'
            className='mb-3'
            size='m'
            type='submit'
            disabled={fileopstatus && fileop === 'upload'}
          >
            Upload File
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
}
UploadFile.propTypes = {
  createfile: PropTypes.func.isRequired,
  filesystem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps, { createfile })(UploadFile);
