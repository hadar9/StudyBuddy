import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../general/buddies/tabs/NameAvatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setbuddypermission,
  addadmin,
  deleteadmin,
} from '../../../../../../actions/drives';

function BuddySetting({
  buddy,
  drives: { drive },
  setbuddypermission,
  addadmin,
  deleteadmin,
}) {
  const [buddyperr, setper] = useState({
    buddyper: buddy.download,
    isadmin: buddy.isadmin,
  });
  const { buddyper, isadmin } = buddyperr;

  const driveadmin = (e) => {
    if (isadmin) {
      deleteadmin(drive._id, buddy.user._id);
    } else {
      addadmin(drive._id, buddy.user._id);
    }
    setper({ ...buddyperr, isadmin: !isadmin });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (buddyper !== buddy.download) {
      setbuddypermission(drive._id, buddy._id, buddyper);
    }
  };
  return (
    <div>
      <NameAvatar username={buddy.user.username} avatar={buddy.user.avatar} />
      <Form onSubmit={(e) => onsubmit(e)}>
        <Row>
          <Button className='mr-5' variant='primary' type='submit' size='sm'>
            Save
          </Button>
          <Form.Check
            className='mr-5'
            type='checkbox'
            label='download content'
            name='formHorizontaldownloadcontentbuddy'
            id='formHorizontaldownloadcontentbuddy'
            checked={buddyper}
            onChange={(e) => setper({ buddyper: e.target.checked })}
          />
        </Row>
      </Form>
      <Button
        className='mr-5'
        variant='primary'
        onClick={(e) => driveadmin(e)}
        size='sm'
      >
        {isadmin ? 'Remove Admin' : 'Add Admin'}
      </Button>
    </div>
  );
}
BuddySetting.propTypes = {
  drives: PropTypes.object.isRequired,
  setbuddypermission: PropTypes.func.isRequired,
  addadmin: PropTypes.func.isRequired,
  deleteadmin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  setbuddypermission,
  addadmin,
  deleteadmin,
})(BuddySetting);
