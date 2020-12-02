import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getmyprofile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileDisplay from '../profile/ProfileDisplay';
import ProfileEdit from '../profile/ProfileEdit';

function Profile({ getmyprofile, alerts }) {
  const [formData, setForm] = useState({
    edit: false,
    editname: 'Edit',
  });

  const { edit, editname } = formData;

  const onclick = (e) => {
    getmyprofile();
    let butn = '';
    edit ? (butn = 'Edit') : (butn = 'Cancel edit');
    setForm({
      edit: !edit,
      editname: butn,
    });
  };

  return (
    <div className='profile text-center'>
      {edit ? <ProfileEdit /> : <ProfileDisplay />}
      <Button
        className='text-center'
        variant='dark'
        onClick={(e) => onclick(e)}
      >
        {editname}
      </Button>
    </div>
  );
}

Profile.propTypes = {
  getmyprofile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { getmyprofile })(Profile);
