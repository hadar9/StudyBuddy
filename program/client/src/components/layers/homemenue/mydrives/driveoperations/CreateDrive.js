import React, { useState } from 'react';
import { Button, Row, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createdrive, getdrives } from '../../../../../actions/drives';

function CreateDrive({ createdrive, getdrives }) {
  const [drivename, setdrive] = useState('');

  const onchange = (e) => {
    setdrive(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    createdrive(drivename);
  };

  return (
    <div>
      <Form onSubmit={(e) => onsubmit(e)}>
        <Row>
          <Form.Control
            type='text'
            placeholder='Drive Name'
            name='drivename'
            value={drivename}
            onChange={(e) => onchange(e)}
          />
          <Button variant='dark' type='submit'>
            Create drive
          </Button>
        </Row>
      </Form>
    </div>
  );
}

CreateDrive.propTypes = {
  createdrive: PropTypes.func.isRequired,
  getdrives: PropTypes.func.isRequired,
};
export default connect(null, { createdrive, getdrives })(CreateDrive);
