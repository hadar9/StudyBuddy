import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  confirmbuddy,
  getmybuddies,
} from '../../../../../../../actions/buddies';
import { searchbuddies } from '../../../../../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Confirm({
  confirmbuddy,
  getmybuddies,
  searchbuddies,
  buddies: { searchinput },
  type,
  selecteduser,
}) {
  const [clicked, setclick] = useState(false);

  const handleConfimBuddy = (e) => {
    confirmbuddy(e.target.value);

    if (type === 'Tabs') {
      getmybuddies('request');
    } else {
      searchbuddies(searchinput);
      setclick(true);
    }
  };
  return (
    <div>
      {' '}
      <Button
        className='mt-2 h-50'
        value={selecteduser}
        size='sm'
        variant='outline-info'
        onClick={(e) => handleConfimBuddy(e)}
        disabled={clicked}
      >
        confirm buddy
      </Button>
    </div>
  );
}

Confirm.propTypes = {
  confirmbuddy: PropTypes.func.isRequired,
  getmybuddies: PropTypes.func.isRequired,
  searchbuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, {
  confirmbuddy,
  getmybuddies,
  searchbuddies,
})(Confirm);
