import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { joindrive } from '../../../../../../actions/drives';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Join({ joindrive, buddies: { searchusername }, selecteddrive }) {
  const [clicked, setclick] = useState(false);

  const handleAddBuddy = (e) => {
    joindrive(e.target.value);
    setclick(true);
    //'getprofiels(searchusername);
  };
  return (
    <div>
      {' '}
      <Button
        className='mt-2 h-50'
        value={selecteddrive}
        size='sm'
        variant='outline-info'
        onClick={(e) => handleAddBuddy(e)}
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
};
const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {
  joindrive,
})(Join);
