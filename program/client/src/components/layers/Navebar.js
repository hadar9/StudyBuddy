import { Button,Form,FormControl,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';



function Navebar() {
    return (
      <div className="NaveBar">
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">StudyBuddy</Navbar.Brand>
    <Form inline className="search">
      <FormControl type="text" placeholder="Search"/>
      <NavDropdown title="by" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Drive name</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">User name</NavDropdown.Item>
    </NavDropdown>
      <Button variant="outline-info">Search</Button>
    </Form>
    <Nav className="profile">
      <Nav.Link href="#home">Profile</Nav.Link>
      </Nav>
  </Navbar>
      </div>
    );
  }
  
  export default Navebar;
  