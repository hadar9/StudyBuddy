import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  deletebuddy,
  getmybuddies,
} from '../../../../../../../actions/buddies';
import { searchbuddies } from '../../../../../../../actions/search';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DeleteReq({
  deletebuddy,
  getmybuddies,
  searchbuddies,
  buddies: { searchusername },
  type,
  selecteduser,
  reqtype,
}) {
  const [clicked, setclick] = useState(false);
  console.log(clicked);
  const handleDeleteBuddy = (e) => {
    deletebuddy(e.target.value);

    if (type === 'Tabs') {
      getmybuddies(reqtype);
    } else {
      searchbuddies(searchusername);
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
        Delete request
      </Button>
    </div>
  );
}

DeleteReq.propTypes = {
  deletebuddy: PropTypes.func.isRequired,
  getmybuddies: PropTypes.func.isRequired,
  searchbuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddies: state.buddies,
});

export default connect(mapStateToProps, {
  deletebuddy,
  getmybuddies,
  searchbuddies,
})(DeleteReq);
