import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { deletereq } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DeleteReq({
  deletereq,
  drives: { searchinput, adminper },
  selecteddrive,
}) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    deletereq(e.target.value, searchinput, adminper);
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
        Cancel request
      </Button>
    </div>
  );
}

DeleteReq.propTypes = {
  drives: PropTypes.object.isRequired,
  deletereq: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  deletereq,
})(DeleteReq);
