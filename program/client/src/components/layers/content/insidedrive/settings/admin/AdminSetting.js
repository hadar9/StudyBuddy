import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setadminper, deleteadmin } from '../../../../../../actions/drives';

function AdminSetting({ admin, drives: { drive }, setadminper, deleteadmin }) {
  const [adminper, setper] = useState({
    createfolder: admin.permission.createfolder,
    upload: admin.permission.createfolder,
    edit: admin.permission.edit,
    deletee: admin.permission.delete,
    confirmbuddy: admin.permission.confirmbuddy,
  });

  const { createfolder, upload, edit, deletee, confirmbuddy } = adminper;

  const onsubmit = (e) => {
    e.preventDefault();
    setadminper(
      drive._id,
      admin._id,
      createfolder,
      upload,
      edit,
      deletee,
      confirmbuddy
    );
  };

  return (
    <div>
      <NameAvatar username={admin.user.username} avatar={admin.user.avatar} />
      <Form onSubmit={(e) => onsubmit(e)}>
        <Row>
          <Button
            className='mr-4'
            variant='primary'
            onClick={(e) => deleteadmin(drive._id, admin.user._id)}
          >
            Delete Admin
          </Button>
          <Button className='mr-4' variant='primary' type='submit'>
            Save
          </Button>

          <Form.Check
            className='mt-2 mr-4'
            type='checkbox'
            label='create folder'
            name='formHorizontalcreatefolder'
            id='formHorizontalcreatefolder'
            checked={createfolder}
            onChange={(e) =>
              setper({ ...adminper, createfolder: e.target.checked })
            }
          />

          <Form.Check
            className='mt-2 mr-4'
            type='checkbox'
            label='upload'
            name='formHorizontalupload'
            id='formHorizontalupload'
            checked={upload}
            onChange={(e) => setper({ ...adminper, upload: e.target.checked })}
          />

          <Form.Check
            className='mt-2  mr-4'
            type='checkbox'
            label='edit'
            name='formHorizontaledit'
            id='formHorizontaledit'
            checked={edit}
            onChange={(e) => setper({ ...adminper, edit: e.target.checked })}
          />

          <Form.Check
            className='mt-2 mr-4'
            type='checkbox'
            label='delete'
            name='formHorizontaldelete'
            id='formHorizontaldelete'
            checked={deletee}
            onChange={(e) => setper({ ...adminper, deletee: e.target.checked })}
          />

          <Form.Check
            className='mt-2 mr-5'
            type='checkbox'
            label='confirm buddies'
            name='formHorizontalconfirm'
            id='formHorizontalconfirm'
            checked={confirmbuddy}
            onChange={(e) =>
              setper({ ...adminper, confirmbuddy: e.target.checked })
            }
          />
        </Row>
      </Form>
    </div>
  );
}
AdminSetting.propTypes = {
  drives: PropTypes.object.isRequired,
  setadminper: PropTypes.func.isRequired,
  deleteadmin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, { setadminper, deleteadmin })(
  AdminSetting
);
