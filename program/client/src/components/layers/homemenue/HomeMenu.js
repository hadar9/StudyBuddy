import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Buddies from './buddies/Buddies';
import { getmybuddies, closeprofiles } from '../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyDrives from './mydrives/MyDrives';

function HomeMenu({ getmybuddies, closeprofiles }) {
  const [key, setKey] = useState({
    components: <MyDrives />,
  });
  const { components } = key;

  return (
    <div>
      <div className='homemenu'>
        <ButtonGroup vertical>
          <Button
            value='MyDrives'
            onClick={(e) => setKey({ components: <MyDrives /> })}
            className='bg-dark text-light'
          >
            My drives
          </Button>
          <Button
            value='Otherdrives'
            onClick={(e) => setKey({ components: <MyDrives /> })}
            className='bg-dark text-light'
          >
            Other drives
          </Button>
          <Button
            value='Favoritedrives'
            onClick={(e) => setKey({ components: <MyDrives /> })}
            className='bg-dark text-light'
          >
            Favorite drives
          </Button>
          <Button
            value='Chatgroups'
            onClick={(e) => setKey({ components: <MyDrives /> })}
            className='bg-dark text-light'
          >
            Chat groups
          </Button>
          <Button
            value='Mybuddies'
            onClick={(e) => {
              setKey({ components: <Buddies /> });
              getmybuddies('mybuddy');
            }}
            className='bg-dark text-light'
          >
            My buddies
          </Button>
          <Button
            value='Recyclebin'
            onClick={(e) => setKey({ components: <MyDrives /> })}
            className='bg-dark text-light'
          >
            Recycle bin
          </Button>
        </ButtonGroup>
      </div>
      <div className='content text-center'>
        <div>{components}</div>
      </div>
    </div>
  );
}

HomeMenu.propTypes = {
  getmybuddies: PropTypes.func.isRequired,
  closeprofiles: PropTypes.func.isRequired,
};

export default connect(null, { getmybuddies, closeprofiles })(HomeMenu);
