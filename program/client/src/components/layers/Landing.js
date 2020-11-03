import React from 'react'
import { Link } from 'react-router-dom';
import {Navbar} from 'react-bootstrap';


 function Landing() {
    return (
        <section className="landing">
             <div className="NaveBar">
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand>StudyBuddy</Navbar.Brand>
    </Navbar>
    </div>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">StudyBuddy</h1>
          <p className="lead">
           Create Drives for manage your files and share/communicate with another 
           students
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-light">Sign Up</Link>
            <Link to="/login" className="btn btn-dark">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
   
}
export default Landing;
