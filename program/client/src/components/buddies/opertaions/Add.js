import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { addbuddy, getprofiels } from '../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Add({
  addbuddy,
  getprofiels,
  buddies: { searchusername },
  selecteduser,
}) {
  const [clicked, setclick] = useState(false);

  const handleAddBuddy = (e) => {
    addbuddy(e.target.value);
    setclick(true);
    getprofiels(searchusername);
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
  buddiess: PropTypes.object.isRequired,
  addbuddy: PropTypes.func.isRequired,
  getprofiels: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, {
  addbuddy,
  getprofiels,
})(Add);
