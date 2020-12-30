import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  deletebuddy,
  getmybuddies,
  getprofiels,
} from '../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DeleteBud(props) {
  const [clicked, setclick] = useState(false);
  const handleDeleteBuddy = (e) => {
    props.deletebuddy(e.target.value);
    setclick(true);
    if (props.type === 'Tabs') {
      props.getmybuddies('mybuddy');
    } else {
      props.getprofiels(props.buddies.searchusername);
    }
  };
  return (
    <div>
      {' '}
      <Button
        className='mt-2 h-50'
        value={props.selecteduser}
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
