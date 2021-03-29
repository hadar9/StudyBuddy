import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function ShowFileSystem({ filesystem: { folder, folderloading } }) {
  
  //Context bar handler
  function handleClick(e, data) 
  {
    console.log(data);
  }

  var children = false;
  if (folder.children.length > 0 && folderloading) {
    children = true;
  }

  return <div>
    {children ? <div>{folder.children.map((elem) => (
      <div>
      <ContextMenuTrigger id={elem._id}>
      <Row> 
        <ShowSystem key={elem._id} elem={elem} />
      </Row>
      </ContextMenuTrigger>
      <ContextMenu id={elem._id} className="context-menu">
      <MenuItem data={{action: 'OpenFile', file: elem}} onClick={handleClick}>
        Open File
      </MenuItem>
      <MenuItem data={{action: 'OpenDiscussion', file: elem}} onClick={handleClick}>
        Open Discussion
      </MenuItem>
      <MenuItem divider />
      <MenuItem data={{action: 'RemoveFile', file: elem}} onClick={handleClick}>
        Remove File
      </MenuItem>
      <MenuItem data={{action: 'Properties'}} onClick={handleClick}>
        Properties
      </MenuItem>
      </ContextMenu>
      </div>
    ))}
    
    </div> : null}
    
    
    </div>;
}
ShowFileSystem.propTypes = {
  filesystem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps)(ShowFileSystem);
