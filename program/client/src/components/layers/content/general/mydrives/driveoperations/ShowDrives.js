import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowDrive from './showdrives/ShowDrive';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function ShowDrives({ drivestate: { drives, drivesloading } }) {
  const mydrives = drives.map((elem) => (
    <Row>
      <ShowDrive key={elem._id} elem={elem} />
    </Row>
  ));
  return <div>{drivesloading ? <div>{mydrives}</div> : null}</div>;
}

ShowDrives.propTypes = {
  drivestate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  drivestate: state.drives,
});

export default connect(mapStateToProps)(ShowDrives);
