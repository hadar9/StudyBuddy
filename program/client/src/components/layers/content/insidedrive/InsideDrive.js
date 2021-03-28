import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { clearfilesystem } from '../../../../actions/filesystem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DriveContent from './drivecontent/DriveContent';
import Settings from './settings/Settings';
import ChatGroups from '../general/chatgroups/ChatGroups';
import RecucleBin from '../general/recyclebin/RecycleBin';

function InsideDrive({ clearfilesystem }) {
  const [key, setKey] = useState({
    components: <DriveContent />,
  });
  const { components } = key;
  return (
    <div>
      <div className='homemenu'>
        <ButtonGroup vertical>
          <Button
            value='homepage'
            onClick={(e) => {
              clearfilesystem();
            }}
            className='bg-dark text-light'
          >
            Home Page
          </Button>
          <Button
            value='drivecontent'
            onClick={(e) => setKey({ components: <DriveContent /> })}
            className='bg-dark text-light'
          >
            Content
          </Button>
          <Button
            value='chatgroups'
            onClick={(e) => setKey({ components: <ChatGroups /> })}
            className='bg-dark text-light'
          >
            Drive Buddies
          </Button>
          <Button
            value='chatgroups'
            onClick={(e) => setKey({ components: <ChatGroups /> })}
            className='bg-dark text-light'
          >
            Chat groups
          </Button>
          <Button
            value='Favoritedrives'
            onClick={(e) => setKey({ components: <Settings /> })}
            className='bg-dark text-light'
          >
            Settings
          </Button>
          <Button
            value='Recyclebin'
            onClick={(e) => setKey({ components: <RecucleBin /> })}
            className='bg-dark text-light'
          >
            Recycle bin
          </Button>
        </ButtonGroup>
      </div>
      <div className='content text-center'>{components}</div>
    </div>
  );
}
InsideDrive.propTypes = {
  clearfilesystem: PropTypes.func.isRequired,
};

export default connect(null, {
  clearfilesystem,
})(InsideDrive);
