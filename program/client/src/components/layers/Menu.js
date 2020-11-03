import { Button,ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function Menu() {
    return (

      <div className="Menu">
     <ButtonGroup vertical >
  <Button className="bg-dark text-light">My drives</Button>
  <Button  className="bg-dark text-light">Other drives</Button>
  <Button  className="bg-dark text-light">Favorite drives</Button>
  <Button className="bg-dark text-light">Chat groups</Button>
  <Button className="bg-dark text-light">Recycelebin</Button>
</ButtonGroup>
      </div>
    );
  }
  
  export default Menu;
  