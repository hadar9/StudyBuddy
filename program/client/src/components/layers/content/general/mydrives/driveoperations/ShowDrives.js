import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowDrive from './showdrives/ShowDrive';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { deletemydrive, leavedrive } from '../../../../../../actions/drives';

function ShowDrives({
  drivestate: { drives, drivesloading, drivestype },
  leavedrive,
  deletemydrive,
}) {
  // Context bar handler
  const handleClick = (e, data) => {
    if (drivestype === 'mydrives') {
      deletemydrive(data.drive);
    } else {
      leavedrive(data.drive._id);
    }
  };
  useEffect(() => {}, [drives]);

  return (
    <div>
      {drivesloading ? (
        <div>
          {drives.map((elem) => (
            <div>
              <ContextMenuTrigger id={elem._id}>
                <Row>
                  <ShowDrive key={elem._id} elem={elem} />
                </Row>
              </ContextMenuTrigger>

              <ContextMenu id={elem._id} className='context-menu'>
                <MenuItem
                  data={{ action: 'Delete', drive: elem }}
                  onClick={handleClick}
                >
                  {drivestype === 'mydrives' ? 'Delete' : 'Leave'}
                </MenuItem>
              </ContextMenu>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

ShowDrives.propTypes = {
  drivestate: PropTypes.object.isRequired,
  leavedrive: PropTypes.func.isRequired,
  deletemydrive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drivestate: state.drives,
});

export default connect(mapStateToProps, { leavedrive, deletemydrive })(
  ShowDrives
);
