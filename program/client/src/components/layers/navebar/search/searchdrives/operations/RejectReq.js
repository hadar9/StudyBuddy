import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { rejectreq } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function RejectReq({ rejectreq, drives: { drive }, selecteduser }) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    rejectreq(drive._id, e.target.value);
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
        Reject request
      </Button>
    </div>
  );
}

RejectReq.propTypes = {
  drives: PropTypes.object.isRequired,
  rejectreq: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  rejectreq,
})(RejectReq);
