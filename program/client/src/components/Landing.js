import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import store from '../store/store';

function Landing() {
  var welcome;
  if(store.getState().auth.user)
  {
    welcome = (
    <div className='dark-overlay'>
    <div className='landing-inner'>
      <h1 className='x-large'>StudyBuddy</h1>
      <p className='lead'>
        Welcome {store.getState().auth.user.username}!
      </p>
      <div className='buttons'>
        <Link to='/home' className='btn btn-light'>
          Proceed home.
        </Link>
      </div>
    </div>
  </div>);
  }
  else
  {
    welcome = (
      <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>StudyBuddy</h1>
            <p className='lead'>
              Create Drives for manage your files and share/communicate with
              another students
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-light'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-dark'>
                Login
              </Link>
            </div>
          </div>
        </div>
    );
  }

function Landing(props) {
  return (
    <section className='landing'>
      <div className='NaveBar'>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand>StudyBuddy</Navbar.Brand>
        </Navbar>
      </div>
      {welcome}
    </section>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);