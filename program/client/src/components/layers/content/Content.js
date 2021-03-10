import React from 'react';
import InsideDrive from './insidedrive/InsideDrive';
import General from './general/General';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Content({ filesystem: { folderloading, fileloading } }) {
  return (
    <div>{folderloading || fileloading ? <InsideDrive /> : <General />}</div>
  );
}
Content.propTypes = {
  filesystem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps, {})(Content);
