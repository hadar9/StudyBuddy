import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Buddies from './buddies/Buddies';
import { getmybuddies } from '../../../../actions/buddies';
import { getmydrives, getotherdrives } from '../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyDrives from './mydrives/MyDrives';
import ChatGroups from './chatgroups/ChatGroups';
import OtherDrives from './otherdrives/OtherDrives';
import RecycleBin from './recyclebin/RecycleBin';
import ChatApp from '../../../../ChatApp';

function General({
  auth: { user },
  getmybuddies,
  getmydrives,
  getotherdrives,
}) {
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
              getmydrives();
            }}
            className='bg-dark text-light'
          >
            My drives
          </Button>
          <Button
            value='Otherdrives'
            onClick={(e) => {
              setKey({ firstload: false, components: <OtherDrives /> });
              getotherdrives();
            }}
            className='bg-dark text-light'
          >
            Other drives
          </Button>
          <Button
            value='Chat'
            onClick={(e) =>
              setKey({ firstload: false, components: <ChatApp /> })
            }
            className='bg-dark text-light'
          >
            Chat
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
        </ButtonGroup>
      </div>
      <div className='content text-center'>
        {firstload ? (
          <h1 className='firstloadtitle'>
            hello {user.username}
            <br></br>have a good learning!!!
          </h1>
        ) : (
          components
        )}
      </div>
    </div>
  );
}
General.propTypes = {
  getmybuddies: PropTypes.func.isRequired,
  getmydrives: PropTypes.func.isRequired,
  getotherdrives: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  drives: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  drives: state.drives,
});

export default connect(mapStateToProps, {
  getmybuddies,
  getmydrives,
  getotherdrives,
})(General);
