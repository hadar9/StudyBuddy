import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowDrive from './showdrives/ShowDrive';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function ShowDrives({ drivestate: { drives, drivesloading } }) {
  
  function handleClick(e, data) {
    console.log(data.action);
  }
  const mydrives = drives.map((elem) => (
    <ContextMenuTrigger id="drive-context-bar">
    <Row>
      <ShowDrive key={elem._id} elem={elem} />
    </Row>
    </ContextMenuTrigger>
  ));
  return <div>
    <ContextMenu id="drive-context-bar">
        <MenuItem data={{action: 'Add'}} onClick={handleClick}>
          Show
        </MenuItem>
        <MenuItem data={{action: 'Rename'}} onClick={handleClick}>
          Rename
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{action: 'Remove'}} onClick={handleClick}>
          Remove
        </MenuItem>
  </ContextMenu>
  
      {drivesloading ? <div>{mydrives}</div> : null}
  </div>;
}

ShowDrives.propTypes = {
  drivestate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  drivestate: state.drives,
});

export default connect(mapStateToProps)(ShowDrives);
