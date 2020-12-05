import React, { Fragment, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Buddies from '../buddies/Buddies';

function HomeMenu() {
  const [key, setKey] = useState({ components: <Buddies /> });
  const { components } = key;

  return (
    <div>
      <div className='homemenu'>
        <ButtonGroup vertical>
          <Button onClick={(e) => onclick(e)} className='bg-dark text-light'>
            My drives
          </Button>
          <Button onClick={(e) => onclick(e)} className='bg-dark text-light'>
            Other drives
          </Button>
          <Button onClick={(e) => onclick(e)} className='bg-dark text-light'>
            Favorite drives
          </Button>
          <Button onClick={(e) => onclick(e)} className='bg-dark text-light'>
            Chat groups
          </Button>
          <Button onClick={(e) => onclick(e)} className='bg-dark text-light'>
            My buddies
          </Button>
          <Button onClick={(e) => onclick(e)} className='bg-dark text-light'>
            Recycle bin
          </Button>
        </ButtonGroup>
      </div>
      <div className='content'>
        <div>
          <Buddies />
        </div>
      </div>
    </div>
  );
}

export default HomeMenu;
