import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { deletedrivebuddy } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DeleteDriveBuddy({
  deletedrivebuddy,
  drives: { drive },
  selecteduser,
}) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    deletedrivebuddy(drive._id, e.target.value);
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
        onClick={(e) => handlejoin(e)}
        disabled={clicked}
      >
        Delete Buddy
      </Button>
    </div>
  );
}

DeleteDriveBuddy.propTypes = {
  drives: PropTypes.object.isRequired,
  deletedrivebuddy: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  deletedrivebuddy,
})(DeleteDriveBuddy);
