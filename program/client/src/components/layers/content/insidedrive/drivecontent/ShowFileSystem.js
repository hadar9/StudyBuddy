import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { deletefolder, deletefile } from '../../../../../actions/filesystem';

function ShowFileSystem({
  filesystem: { folder, folderloading },
  deletefolder,
  deletefile,
}) {
  useEffect(() => {}, [folder]);
  //Context bar handler
  function handleClick(e, data) {
    if (data.action === 'Delete') {
      if (data.file.objtype === 'folder') {
        deletefolder(data.file);
      } else {
        deletefile(data.file);
      }
    }
  }
  let children = false;

  if (folder.children.length > 0 && folderloading) {
    children = true;
  }

  return (
    <div>
      {children ? (
        <div>
          {folder.children.map((elem) => (
            <div>
              <ContextMenuTrigger id={elem._id}>
                <Row>
                  <ShowSystem key={elem._id} elem={elem} />
                </Row>
              </ContextMenuTrigger>
              <ContextMenu id={elem._id} className='context-menu'>
                {elem.objtype !== 'folder' ? (
                  <div>
                    <MenuItem
                      data={{ action: 'Download', file: elem }}
                      onClick={handleClick}
                    >
                      Download
                    </MenuItem>
                    <MenuItem
                      data={{ action: 'OpenDiscussion', file: elem }}
                      onClick={handleClick}
                    >
                      Open Discussion
                    </MenuItem>
                    <MenuItem divider />
                  </div>
                ) : null}
                <MenuItem
                  data={{ action: 'Delete', file: elem }}
                  onClick={handleClick}
                >
                  Delete
                </MenuItem>
              </ContextMenu>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
ShowFileSystem.propTypes = {
  filesystem: PropTypes.object.isRequired,
  deletefolder: PropTypes.func.isRequired,
  deletefile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps, { deletefolder, deletefile })(
  ShowFileSystem
);
