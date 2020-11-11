import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function HomeMenu() {
  return (
    <div className='homemenu'>
      <ButtonGroup vertical>
        <Button className='bg-dark text-light'>My drives</Button>
        <Button className='bg-dark text-light'>Other drives</Button>
        <Button className='bg-dark text-light'>Favorite drives</Button>
        <Button className='bg-dark text-light'>Chat groups</Button>
        <Button className='bg-dark text-light'>My buddies</Button>
        <Button className='bg-dark text-light'>Recycle bin</Button>
      </ButtonGroup>
    </div>
  );
}

export default HomeMenu;
