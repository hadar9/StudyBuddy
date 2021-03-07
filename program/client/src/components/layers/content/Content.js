import React from 'react';
import InsideDrive from './insidedrive/InsideDrive';
import General from './general/General';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Content({ drives: { driveloading } }) {
  return <div>{driveloading ? <InsideDrive /> : <General />}</div>;
}
Content.propTypes = {
  drives: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  drives: state.drives,
});

export default connect(mapStateToProps, {})(Content);
