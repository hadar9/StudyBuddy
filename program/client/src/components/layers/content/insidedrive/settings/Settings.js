import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DriveBuddies from './drivebuddies/DriveBuddies';

function Settings({ drives: { drive, driveloading } }) {
  const [settingfield, setsettings] = useState({
    drivepermission: drive.drivepermission,
  });
  const { drivepermission } = settingfield;

  return (
    <div className='settings'>
      <h1 className='settings-title'>Settings</h1>
      <Form>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as='legend'>Drive Permission</Form.Label>
            <Form.Check
              type='radio'
              label='private'
              name='formHorizontalRadios'
              id='formHorizontalprivate'
            />
            <Form.Check
              type='radio'
              label='public'
              name='formHorizontalRadios'
              id='formHorizontalpublic'
            />
          </Form.Group>
        </fieldset>
        <div className='settings-drivebuddies'>
          <h4>Drive Buddies:</h4>
          <DriveBuddies drivebuddies={drive.drivebuddies} />
        </div>
        <div className='settings-admins'>
          <Form.Group>
            <Form.Label as='legend'>Admins:</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='create folder'
                  name='formHorizontalcreatefolder'
                  id='formHorizontalcreatefolder'
                  checked={true}
                  disabled={drivepermission}
                />
              </Col>

              <Col>
                <Form.Check
                  type='checkbox'
                  label='upload'
                  name='formHorizontalupload'
                  id='formHorizontalupload'
                  checked={true}
                  disabled={drivepermission}
                />
              </Col>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='edit'
                  name='formHorizontaledit'
                  id='formHorizontaledit'
                  checked={true}
                  disabled={drivepermission}
                />
              </Col>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='delete'
                  name='formHorizontaldelete'
                  id='formHorizontaldelete'
                  checked={true}
                  disabled={drivepermission}
                />
              </Col>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='confirm buddies'
                  name='formHorizontalconfirm'
                  id='formHorizontalconfirm'
                  checked={true}
                  disabled={drivepermission}
                />
              </Col>
            </Row>
          </Form.Group>
        </div>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
Settings.propTypes = {
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {})(Settings);
