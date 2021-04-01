import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { confirmjoindrive } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function ConfirmrReq({
  confirmjoindrive,
  drives: { searchinput },
  selecteddrive,
}) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    confirmjoindrive(e.target.value);
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
