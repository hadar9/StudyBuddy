import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setbuddypermission, addadmin } from '../../../../../../actions/drives';

function BuddySetting({
  buddy,
  drives: { drive },
  setbuddypermission,
  addadmin,
}) {
  const [buddyperr, setper] = useState(buddy.download);

  const onsubmit = (e) => {
    e.preventDefault();
    if (buddyperr !== buddy.download) {
      setbuddypermission(drive._id, buddy._id, buddyperr);
    }
  };
  return (
    <div>
      <NameAvatar username={buddy.user.username} avatar={buddy.user.avatar} />
      <Form onSubmit={(e) => onsubmit(e)}>
        <Row>
          {buddy.isadmin === false ? (
            <Button
              className='mr-4'
              variant='primary'
              onClick={(e) => addadmin(drive._id, buddy.user._id)}
            >
              Add Admin
            </Button>
          ) : null}
          <Button className='mr-4' variant='primary' type='submit'>
            Save
          </Button>
          <Form.Check
            className='mt-2 mr-5'
            type='checkbox'
            label='download content'
            name='formHorizontaldownloadcontentbuddy'
            id='formHorizontaldownloadcontentbuddy'
            checked={buddyperr}
            onChange={(e) => setper(e.target.checked)}
          />
        </Row>
      </Form>
    </div>
  );
}
BuddySetting.propTypes = {
  drives: PropTypes.object.isRequired,
  setbuddypermission: PropTypes.func.isRequired,
  addadmin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  setbuddypermission,
  addadmin,
})(BuddySetting);
