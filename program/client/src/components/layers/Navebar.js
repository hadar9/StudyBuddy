import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getmyprofile } from '../../actions/profile';
import Popup from 'reactjs-popup';
import Profile from '../Profile';
import React, { useEffect } from 'react';

function Navebar({ logout, getmyprofile }) {
  useEffect(() => {
    getmyprofile();
  }, []);

  return (
    <div className='NaveBar'>
      <Navbar bg='dark' variant='dark'>
        <Link to='/home'>
          <Navbar.Brand>StudyBuddy</Navbar.Brand>
        </Link>
        <Form inline className='search'>
          <FormControl type='text' placeholder='Search' />
          <NavDropdown title='by' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/Drivename'>
              Drive name
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/username'>
              User name
            </NavDropdown.Item>
          </NavDropdown>
          <Button variant='outline-info'>Search</Button>
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
};

export default connect(null, { logout, getmyprofile })(Navebar);
