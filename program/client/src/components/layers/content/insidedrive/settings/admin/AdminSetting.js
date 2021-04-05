import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {} from '../../../../../../actions/drives';

function AdminSetting({ admin, drives: { drive } }) {
  const [adminper, setper] = useState(admin.permission.createfolder);

  const onsubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <NameAvatar username={admin.user.username} avatar={admin.user.avatar} />
      <Form onSubmit={(e) => onsubmit(e)}>
        <Row>
          <Button className='mr-4' variant='primary' type='submit'>
            Save
          </Button>

          <Form.Check
            className='mt-2 mr-4'
            type='checkbox'
            label='create folder'
            name='formHorizontalcreatefolder'
            id='formHorizontalcreatefolder'
            checked={admin.permission.createfolder}
          />

          <Form.Check
            className='mt-2 mr-4'
            type='checkbox'
            label='upload'
            name='formHorizontalupload'
            id='formHorizontalupload'
            checked={admin.permission.upload}
          />

          <Form.Check
            className='mt-2  mr-4'
            type='checkbox'
            label='edit'
            name='formHorizontaledit'
            id='formHorizontaledit'
            checked={admin.permission.edit}
          />

          <Form.Check
            className='mt-2 mr-4'
            type='checkbox'
            label='delete'
            name='formHorizontaldelete'
            id='formHorizontaldelete'
            checked={admin.permission.delete}
          />

          <Form.Check
            className='mt-2 mr-5'
            type='checkbox'
            label='confirm buddies'
            name='formHorizontalconfirm'
            id='formHorizontalconfirm'
            checked={admin.permission.confirmbuddy}
          />
        </Row>
      </Form>
    </div>
  );
}
AdminSetting.propTypes = {
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {})(AdminSetting);
