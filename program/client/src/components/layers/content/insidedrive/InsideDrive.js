import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { cleardrive } from '../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyDrives from '../general/mydrives/MyDrives';

function InsideDrive({ drives: { drive }, cleardrive }) {
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
            value='homepage'
            onClick={(e) => {
              cleardrive();
            }}
            className='bg-dark text-light'
          >
            Home Page
          </Button>
          <Button
            value='Otherdrives'
            onClick={(e) =>
              setKey({ firstload: false, components: <MyDrives /> })
            }
            className='bg-dark text-light'
          >
            Chat groups
          </Button>
          <Button
            value='Favoritedrives'
            onClick={(e) =>
              setKey({ firstload: false, components: <MyDrives /> })
            }
            className='bg-dark text-light'
          >
            Settings
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
      <div className='content text-center'>{drive.name}</div>
    </div>
  );
}
InsideDrive.propTypes = {
  cleardrive: PropTypes.func.isRequired,
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  cleardrive,
})(InsideDrive);
