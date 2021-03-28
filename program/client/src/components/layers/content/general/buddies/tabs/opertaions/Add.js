import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { addbuddy } from '../../../../../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchbuddies } from '../../../../../../../actions/search';
function Add({
  addbuddy,
  searchbuddies,
  buddies: { searchusername },
  selecteduser,
}) {
  const [clicked, setclick] = useState(false);

  const handleAddBuddy = (e) => {
    addbuddy(e.target.value);
    setclick(true);
    searchbuddies(searchusername);
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
  searchbuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, {
  addbuddy,
  searchbuddies,
})(Add);
