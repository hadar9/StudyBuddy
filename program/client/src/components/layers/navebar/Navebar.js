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
import { searchdrives, clearsearchdrives } from '../../../actions/drives';
import { searchbuddies, clearbuddy } from '../../../actions/buddies';
import { getmyprofile } from '../../../actions/profile';
import Profile from './profile/Profile';
import SearchBuddies from './search/SearchBuddies';
import React, { useState } from 'react';
import Select from 'react-select';
import { setalert } from '../../../actions/alert';
import SearchDrives from './search/searchdrives/SearchDrives';

function Navebar({
  logout,
  getmyprofile,
  searchbuddies,
  clearbuddy,
  clearsearchdrives,
  searchdrives,
  alerts,
  buddies: { mybuddieslsloading },
  drives: { drivessearchloading },
  profile: { loading },
}) {
  const [formData, setForm] = useState({
    search: '',
    byvalue: 'username',
    bylabel: 'user name',
    showmyprofile: false,
    showsearch: false,
    component: <SearchBuddies />,
  });

  const options = [
    { value: 'username', label: 'user name' },
    { value: 'drivename', label: 'drive name' },
  ];
  const {
    search,
    byvalue,
    bylabel,
    showmyprofile,
    showsearch,
    component,
  } = formData;

  const bychange = (selected) => {
    setForm({ ...formData, byvalue: selected.value, bylabel: selected.label });
  };
  const onchange = (e) => setForm({ ...formData, search: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    let temp;
    if (byvalue === 'username') {
      searchbuddies(search);
      temp = <SearchBuddies />;
    } else {
      searchdrives(search);
      temp = <SearchDrives />;
    }
    setForm({
      showsearch: true,
      search: '',
      component: temp,
    });
  };
  const handleCloseMyProfile = () => setForm({ showmyprofile: false });
  const handleShowMyProfile = () => {
    getmyprofile();
    setForm({ showmyprofile: true });
  };
  const handleCloseSearch = () => {
    setForm({ showsearch: false });
    if (byvalue === 'username') {
      clearbuddy();
    } else {
      clearsearchdrives();
    }
  };

  return (
    <div className='NaveBar'>
      <Navbar bg='dark' variant='dark'>
        <Alert variant={alerts.mtype}>{alerts.msg}</Alert>
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
        {showsearch &&
        mybuddieslsloading === false &&
        drivessearchloading === false ? (
          <Spinner animation='border' variant='info' />
        ) : null}
        <Modal
          show={showsearch && (mybuddieslsloading || drivessearchloading)}
          onHide={handleCloseSearch}
          backdrop='static'
          keyboard={false}
          contentClassName='custom-modal-style'
        >
          <Modal.Header closeButton>
            <Modal.Title className='modaltitle'>Search Results:</Modal.Title>
          </Modal.Header>
          <Modal.Body>{component}</Modal.Body>
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
  searchbuddies: PropTypes.func.isRequired,
  clearbuddy: PropTypes.func.isRequired,
  clearsearchdrives: PropTypes.func.isRequired,
  searchdrives: PropTypes.func.isRequired,
  setalert: PropTypes.func.isRequired,
  alerts: PropTypes.object.isRequired,
  buddies: PropTypes.object.isRequired,
  drives: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  buddies: state.buddies,
  drives: state.drives,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  logout,
  getmyprofile,
  searchbuddies,
  setalert,
  clearbuddy,
  clearsearchdrives,
  searchdrives,
})(Navebar);
