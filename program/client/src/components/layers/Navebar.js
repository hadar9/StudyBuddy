import { Button, Form, FormControl, Nav, Navbar, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getmyprofile, getprofiels } from '../../actions/profile';
import Popup from 'reactjs-popup';
import Profile from '../profile/Profile';
import Profiels from '../profile/Profiels';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { setalert } from '../../actions/alert';

function Navebar({ logout, getmyprofile, getprofiels, setalert, alerts }) {
  const [formData, setForm] = useState({
    search: '',
    byvalue: 'by',
    bylabel: 'by',
  });

  const options = [
    { value: 'by', label: 'by' },
    { value: 'username', label: 'user name' },
    { value: 'drivename', label: 'drive name' },
  ];
  const { search, byvalue, bylabel } = formData;

  const bychange = (selected) => {
    setForm({ ...formData, byvalue: selected.value, bylabel: selected.label });
  };
  const onchange = (e) => setForm({ ...formData, search: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    if (byvalue === 'username') {
      getprofiels(search);
    } else if (byvalue === 'drivename') {
      //add drive search
    } else {
      setalert('you need to choose by', 'danger');
    }
  };
  useEffect(() => {
    getmyprofile();
  }, []);

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
          placeholder='by'
          onChange={(selected) => bychange(selected)}
          value={byvalue}
        ></Select>
        <Form inline onSubmit={(e) => onsubmit(e)}>
          <FormControl
            type='text'
            placeholder='Search'
            name='search'
            value={search}
            onChange={(e) => onchange(e)}
            required
          />
          <Popup
            className='popup'
            trigger={
              <Button type='submit' variant='outline-info'>
                Search
              </Button>
            }
          >
            <div className='popupprofiels'>
              <Profiels />
            </div>
          </Popup>
        </Form>

        <Nav className='navbtn'>
          <Popup
            className='popup'
            trigger={<Button className='popupbtn'> Profile</Button>}
          >
            <div className='popupcontent'>
              <Profile />
            </div>
          </Popup>
          <Nav.Link as={Link} onClick={logout} to='/'>
            log out
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

Navebar.propTypes = {
  logout: PropTypes.func.isRequired,
  getmyprofile: PropTypes.func.isRequired,
  getprofiels: PropTypes.func.isRequired,
  setalert: PropTypes.func.isRequired,
  alerts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  logout,
  getmyprofile,
  getprofiels,
  setalert,
})(Navebar);
