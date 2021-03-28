import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getuserprofile } from '../../../../../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Show({ getuserprofile, selecteduser }) {
  const handleShowProfile = (e) => {
    getuserprofile(e.target.value);
  };

  return (
    <div>
      <Button
        className='mt-2 mr-4 h-50'
        value={selecteduser}
        size='sm'
        variant='outline-info'
        onClick={(e) => handleShowProfile(e)}
      >
        show profile
      </Button>
    </div>
  );
}

Show.propTypes = {
  getuserprofile: PropTypes.func.isRequired,
};

export default connect(null, {
  getuserprofile,
})(Show);
