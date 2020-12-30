import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  confirmbuddy,
  getmybuddies,
  getprofiels,
} from '../../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Confirm(props) {
  const [clicked, setclick] = useState(false);

  const handleConfimBuddy = (e) => {
    props.confirmbuddy(e.target.value);
    setclick(true);
    if (props.type === 'Tabs') {
      props.getmybuddies('request');
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
  getprofiels: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, {
  confirmbuddy,
  getmybuddies,
  getprofiels,
})(Confirm);
