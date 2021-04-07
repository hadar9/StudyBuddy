import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BuddiesSettings from './buddiessettings/BuddiesSettings';
import AdminsSettings from './admin/AdminsSettings';

function Settings({ drives: { drive, driveloading } }) {
  const [settingfield, setsettings] = useState({
    drivepermission: drive.drivepermission,
  });
  const { drivepermission } = settingfield;

  return (
    <div className='settings text-center'>
      <h1 className='settings-title'>Settings</h1>
      <h4 className='mt-4'>Drive Permission</h4>
      <div className='drivepermissionsetting'>
        <Form>
          <Row>
            <Button className='mr-5' variant='primary' type='submit'>
              Save
            </Button>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Check
                  type='radio'
                  label='private'
                  name='formHorizontalRadios'
                  id='formHorizontalprivate'
                  className='mr-4'
                />
                <Form.Check
                  type='radio'
                  label='public'
                  name='formHorizontalRadios'
                  id='formHorizontalpublic'
                />
              </Form.Group>
            </fieldset>
          </Row>
        </Form>
      </div>
      <div className='settings-drivebuddies'>
        <h4>Drive Buddies:</h4>
        <BuddiesSettings drivebuddies={drive.drivebuddies} />
      </div>
      <div className='settings-admins'>
        <h4>Admins:</h4>
        <AdminsSettings drivesubadmins={drive.subadmins} />
      </div>
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
