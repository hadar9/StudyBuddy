import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Buddies from './buddies/Buddies';
import { getmybuddies } from '../../../../actions/buddies';
import { getdrives } from '../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyDrives from './mydrives/MyDrives';

function General({ auth: { user }, getmybuddies, getdrives }) {
  const [key, setKey] = useState({
    firstload: true,
    components: '',
  });
  const { firstload, components } = key;
  return (
    <div>
      <div className='homemenu'>
        <ButtonGroup vertical>
          <Button
            value='MyDrives'
            onClick={(e) => {
              setKey({ firstload: false, components: <MyDrives /> });
              getdrives();
            }}
            className='bg-dark text-light'
          >
            My drives
          </Button>
          <Button
            value='Otherdrives'
            onClick={(e) =>
              setKey({ firstload: false, components: <MyDrives /> })
            }
            className='bg-dark text-light'
          >
            Other drives
          </Button>
          <Button
            value='Favoritedrives'
            onClick={(e) =>
              setKey({ firstload: false, components: <MyDrives /> })
            }
            className='bg-dark text-light'
          >
            Favorite drives
          </Button>
          <Button
            value='Chatgroups'
            onClick={(e) =>
              setKey({ firstload: false, components: <MyDrives /> })
            }
            className='bg-dark text-light'
          >
            Chat groups
          </Button>
          <Button
            value='Mybuddies'
            onClick={(e) => {
              setKey({ firstload: false, components: <Buddies /> });
              getmybuddies('mybuddy');
            }}
            className='bg-dark text-light'
          >
            Buddies
          </Button>
          <Button
            value='Recyclebin'
            onClick={(e) =>
              setKey({ firstload: false, components: <MyDrives /> })
            }
            className='bg-dark text-light'
          >
            Recycle bin
          </Button>
        </ButtonGroup>
      </div>
      <div className='content text-center'>
        {firstload ? <h1>hello {user.username}</h1> : components}
      </div>
    </div>
  );
}
General.propTypes = {
  getmybuddies: PropTypes.func.isRequired,
  getdrives: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  drives: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  drives: state.drives,
});

export default connect(mapStateToProps, {
  getmybuddies,
  getdrives,
})(General);
