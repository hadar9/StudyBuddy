import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowDrive from './showdrives/ShowDrive';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function ShowDrives({ drivestate: { drives, drivesloading } }) {
  
  // Context bar handler
  const handleClick = (e, data) =>
  {
    console.log(data.file);
  }
  
  return <div>
            {drivesloading ? <div>{drives.map((elem) => (
            <div>
            <ContextMenuTrigger id= {elem._id}>
            <Row>
              <ShowDrive key={elem._id} elem={elem} />
            </Row>
            </ContextMenuTrigger>

            <ContextMenu id={elem._id} className="context-menu">
            <MenuItem data={{action: 'Show', file: elem}} onClick={handleClick}>
              Show
            </MenuItem>
            <MenuItem data={{action: 'Rename', file: elem}} onClick={handleClick}>
              Rename
            </MenuItem>
            <MenuItem divider />
            <MenuItem data={{action: 'Remove', file: elem}} onClick={handleClick}>
              Remove
            </MenuItem>
            </ContextMenu>
        </div>
          ))}</div> : null}
          
          </div>;
}

ShowDrives.propTypes = {
  drivestate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  drivestate: state.drives,
});

export default connect(mapStateToProps)(ShowDrives);
