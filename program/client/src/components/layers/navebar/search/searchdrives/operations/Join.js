import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { joindrive, searchdrives } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Join({ joindrive, drives: { searchinput }, selecteddrive }) {
  const [clicked, setclick] = useState(false);

  const handlejoin = (e) => {
    joindrive(e.target.value, searchinput);
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
        Join
      </Button>
    </div>
  );
}

Join.propTypes = {
  drives: PropTypes.object.isRequired,
  joindrive: PropTypes.func.isRequired,
  searchdrives: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  joindrive,
  searchdrives,
})(Join);
