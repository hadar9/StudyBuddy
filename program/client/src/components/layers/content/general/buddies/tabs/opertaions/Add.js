import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { addbuddy } from '../../../../../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Add({ addbuddy, buddies: { searchinput }, selecteduser }) {
  const [clicked, setclick] = useState(false);

  const handleAddBuddy = (e) => {
    addbuddy(e.target.value, searchinput);
    setclick(true);
  };
  return (
    <div>
      {' '}
      <Button
        className='mt-2 h-50'
        value={selecteduser}
        size='sm'
        variant='outline-info'
        onClick={(e) => handleAddBuddy(e)}
        disabled={clicked}
      >
        Add buddy
      </Button>
    </div>
  );
}

Add.propTypes = {
  buddies: PropTypes.object.isRequired,
  addbuddy: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, {
  addbuddy,
})(Add);
