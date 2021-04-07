import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BuddiesSettings from './buddiessettings/BuddiesSettings';
import AdminsSettings from './admin/AdminsSettings';
import { setdrivepermission } from '../../../../../actions/drives';

function Settings({ drives: { drive }, setdrivepermission }) {
  let initialper = drive.drivepermission === true ? 'private' : 'public';
  const [settingfield, setsettings] = useState(initialper);

  const onsumbit = (e) => {
    e.preventDefault();
    let per = settingfield === 'private' ? true : false;
    if (per !== drive.drivepermission) setdrivepermission(drive._id, per);
  };
  return (
    <div className='settings text-center'>
      <h1 className='settings-title'>Settings</h1>
      <h4 className='mt-4'>Drive Permission</h4>
      <div className='drivepermissionsetting'>
        <Form onSubmit={(e) => onsumbit(e)}>
          <Row>
            <Button className='mr-5' variant='primary' type='submit'>
              Save
            </Button>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Check
                  value='private'
                  type='radio'
                  label='private'
                  name='formHorizontalRadios'
                  id='formHorizontalprivate'
                  className='mr-4'
                  onChange={(e) => setsettings(e.target.value)}
                  checked={settingfield === 'private'}
                />
                <Form.Check
                  value='public'
                  type='radio'
                  label='public'
                  name='formHorizontalRadios'
                  id='formHorizontalpublic'
                  onChange={(e) => setsettings(e.target.value)}
                  checked={settingfield === 'public'}
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
  setdrivepermission: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, { setdrivepermission })(Settings);
