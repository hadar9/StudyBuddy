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
          <Button className='mr-5' variant='primary' type='submit' size='sm'>
            Save
          </Button>
          <Form.Group>
            <Row>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='create folder'
                  name='formHorizontalcreatefolder'
                  id='formHorizontalcreatefolder'
                  checked={admin.permission.createfolder}
                />
              </Col>

              <Col>
                <Form.Check
                  type='checkbox'
                  label='upload'
                  name='formHorizontalupload'
                  id='formHorizontalupload'
                  checked={admin.permission.upload}
                />
              </Col>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='edit'
                  name='formHorizontaledit'
                  id='formHorizontaledit'
                  checked={admin.permission.edit}
                />
              </Col>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='delete'
                  name='formHorizontaldelete'
                  id='formHorizontaldelete'
                  checked={admin.permission.delete}
                />
              </Col>
              <Col>
                <Form.Check
                  type='checkbox'
                  label='confirm buddies'
                  name='formHorizontalconfirm'
                  id='formHorizontalconfirm'
                  checked={admin.permission.confirmbuddy}
                />
              </Col>
            </Row>
          </Form.Group>
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
