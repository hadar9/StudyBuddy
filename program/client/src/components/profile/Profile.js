import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getmyprofile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileDisplay from '../profile/ProfileDisplay';
import ProfileEdit from '../profile/ProfileEdit';

function Profile({ getmyprofile }) {
  const [formData, setForm] = useState({
    edit: false,
    editname: 'Edit',
  });

  const { edit, editname } = formData;

  const onclick = (e) => {
    let butn = '';
    if (edit) {
      butn = 'Edit';
    } else {
      getmyprofile();

      butn = 'Cancel edit';
    }
    setForm({
      edit: !edit,
      editname: butn,
    });
  };

  return (
    <div className='profile text-center'>
      {edit ? <ProfileEdit /> : <ProfileDisplay />}
      <Button className='my-4' variant='dark' onClick={(e) => onclick(e)}>
        {editname}
      </Button>
    </div>
  );
}

Profile.propTypes = {
  getmyprofile: PropTypes.func.isRequired,
};

export default connect(null, { getmyprofile })(Profile);
