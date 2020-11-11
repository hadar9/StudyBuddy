import { Button,Form,FormControl,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';





function Navebar() {
    return (
 
      <div className="NaveBar">
      <Navbar bg="dark" variant="dark">
      <Link to="/home"><Navbar.Brand>StudyBuddy</Navbar.Brand></Link>
    <Form inline className="search">
      <FormControl type="text" placeholder="Search"/>
      <NavDropdown title="by" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Drive name</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">User name</NavDropdown.Item>
    </NavDropdown>
      <Button variant="outline-info">Search</Button>
    </Form>
    <Nav className="navbtn">
      <Nav.Link  as={Link} to="/profile">Profile</Nav.Link>
      <Nav.Link as={Link} to="/">log out</Nav.Link>
      </Nav>
  </Navbar>
      </div>
     
    );
  }
  
  export default Navebar;
  