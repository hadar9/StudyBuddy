import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { leavedrive } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DeleteDriveBuddy({
  leavedrive,
  drives: { searchinput },
  selecteddrive,
}) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    leavedrive(e.target.value, searchinput);
    setclick(true);
  };
  return (
    <div>
      {' '}
      <Button
        className='mt-2 h-50'
        value={selecteddrive}
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
  leavedrive: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  leavedrive,
})(DeleteDriveBuddy);
