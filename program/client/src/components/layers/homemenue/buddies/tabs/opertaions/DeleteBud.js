import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  deletebuddy,
  getmybuddies,
  getprofiels,
} from '../../../../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DeleteBud({
  deletebuddy,
  getmybuddies,
  getprofiels,
  buddies: { searchusername },
  type,
  selecteduser,
}) {
  const [clicked, setclick] = useState(false);
  const handleDeleteBuddy = (e) => {
    deletebuddy(e.target.value);
    if (type === 'Tabs') {
      getmybuddies('mybuddy');
    } else {
      getprofiels(searchusername);
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
        onClick={(e) => handleDeleteBuddy(e)}
        disabled={clicked}
      >
        Delete buddy
      </Button>
    </div>
  );
}

DeleteBud.propTypes = {
  deletebuddy: PropTypes.func.isRequired,
  getmybuddies: PropTypes.func.isRequired,
  getprofiels: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});
export default connect(mapStateToProps, {
  deletebuddy,
  getmybuddies,
  getprofiels,
})(DeleteBud);
