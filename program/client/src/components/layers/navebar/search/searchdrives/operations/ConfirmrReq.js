import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { confirmjoindrive } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function ConfirmrReq({
  confirmjoindrive,
  drives: { drive, adminper },
  selecteduser,
}) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    confirmjoindrive(drive._id, e.target.value, adminper);
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
        Confirm Buddy
      </Button>
    </div>
  );
}

ConfirmrReq.propTypes = {
  drives: PropTypes.object.isRequired,
  confirmjoindrive: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  confirmjoindrive,
})(ConfirmrReq);
