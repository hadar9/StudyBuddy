import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  Alert,
  Modal,
  Spinner,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getprofiels, closeprofiles } from '../../../actions/buddies';
import { getmyprofile } from '../../../actions/profile';
import Profile from './profile/Profile';
import SearchBuddies from './search/SearchBuddies';
import React, { useState } from 'react';
import Select from 'react-select';
import { setalert } from '../../../actions/alert';

function Navebar({
  logout,
  getmyprofile,
  getprofiels,
  closeprofiles,
  alerts,
  buddies: { searchloading },
  profile: { loading },
}) {
  const [formData, setForm] = useState({
    search: '',
    byvalue: 'username',
    bylabel: 'user name',
    showmyprofile: false,
    showprofiles: false,
  });

  const options = [
    { value: 'username', label: 'user name' },
    { value: 'drivename', label: 'drive name' },
  ];
  const { search, byvalue, bylabel, showmyprofile, showprofiles } = formData;

  const bychange = (selected) => {
    setForm({ ...formData, byvalue: selected.value, bylabel: selected.label });
  };
  const onchange = (e) => setForm({ ...formData, search: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    if (byvalue === 'username') {
      getprofiels(search);
      setForm({
        showprofiles: true,
        search: '',
      });
    } else {
      //add drive search
    }
  };
  const handleCloseMyProfile = () => setForm({ showmyprofile: false });
  const handleShowMyProfile = () => {
    getmyprofile();
    setForm({ showmyprofile: true });
  };
  const handleCloseProfiels = () => {
    setForm({ showprofiles: false });
    closeprofiles();
  };

  return (
    <div className='NaveBar'>
      <Alert variant={alerts.mtype}>{alerts.msg}</Alert>
      <Navbar bg='dark' variant='dark'>
        <Link to='/home'>
          <Navbar.Brand>StudyBuddy</Navbar.Brand>
        </Link>
        <Select
          className='col-md-2 col-offset-1'
          options={options}
          placeholder={bylabel}
          onChange={(selected) => bychange(selected)}
          value={byvalue}
        >
          {bylabel}
        </Select>
        <Form inline onSubmit={(e) => onsubmit(e)}>
          <FormControl
            type='text'
            placeholder='Search'
            name='search'
            value={search}
            onChange={(e) => onchange(e)}
            required
          />
          <Button className='ml-2' type='submit' variant='outline-info'>
            Search
          </Button>
        </Form>
        {showprofiles && searchloading === false ? (
          <Spinner animation='border' variant='info' />
        ) : null}
        <Modal
          show={showprofiles && searchloading}
          onHide={handleCloseProfiels}
          backdrop='static'
          keyboard={false}
          contentClassName='custom-modal-style'
        >
          <Modal.Header closeButton>
            <Modal.Title className='modaltitle'>Search Results:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchBuddies />
          </Modal.Body>
        </Modal>

        <Nav className='navbtn'>
          <Button variant='outline-info' onClick={handleShowMyProfile}>
            Profile
          </Button>
          <Nav.Link as={Link} onClick={logout} to='/'>
            log out
          </Nav.Link>
        </Nav>

        <Modal
          show={showmyprofile && loading}
          onHide={handleCloseMyProfile}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            {' '}
            <Modal.Title className='modaltitle'>My Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Profile />
          </Modal.Body>
        </Modal>
      </Navbar>
    </div>
  );
}

Navebar.propTypes = {
  logout: PropTypes.func.isRequired,
  getmyprofile: PropTypes.func.isRequired,
  getprofiels: PropTypes.func.isRequired,
  closeprofiles: PropTypes.func.isRequired,
  setalert: PropTypes.func.isRequired,
  alerts: PropTypes.object.isRequired,
  buddies: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  buddies: state.buddies,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  logout,
  getmyprofile,
  getprofiels,
  setalert,
  closeprofiles,
})(Navebar);