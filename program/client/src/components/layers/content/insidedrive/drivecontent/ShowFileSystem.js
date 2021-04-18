import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {
  deletefolder,
  deletefile,
  findfolder,
} from '../../../../../actions/filesystem';
import store from '../../../../../store/store';



function ShowFileSystem({
  filesystem: { folder, folderloading },
  drives: { adminper },
  deletefolder,
  deletefile,
  findfolder,
}) 
{
  useEffect(() => {}, [folder]);
  //Context bar handler
  function handleClick(e, data) {
    switch (data.action) {
      case 'Delete':
        if (data.file.objtype === 'folder') {
          deletefolder(data.file);
        } else {
          deletefile(data.file);
        }
        break;
      //download
      default:
        break;
    }
  }
  function path_callback(dest) {
    findfolder(user+dest);
  }

  function create_path_array(path) {
    let path_array = path.split('/');
    let paths = [];
    for (let iter = 0; iter < path_array.length; iter++) {
      if (iter === 0) 
      {
        user = path_array[iter]
        paths.push(['']);
      }
      else paths.push([paths[iter - 1] + '/' + path_array[iter]]);
    }
    return paths;
  }

  let children = false;

  if (folder.children.length > 0 && folderloading) {
    children = true;
  }
  var user;
  const paths = create_path_array(folder.path);

  var loading = (
    <div>
    <div className='loader-background'></div>
    <div className='loader'></div>
    </div>
  )
  const isLoading = store.getState().filesystem.loading;

  if(isLoading)
  {
    return loading
  }
  return (
    <div>
      <div className='pathtry'>
        <a className='path'>Path: </a>
        {paths.map((locp) => (
          <a
            className='path'
            href='#'
            onClick={() => path_callback(locp, folder)}
          >
            {locp[0].split('/').slice(-1).pop() + ' / '}
          </a>
        ))}
      </div>
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
                    {adminper === null || adminper.download ? (
                      <MenuItem
                        data={{ action: 'Download', file: elem }}
                        onClick={handleClick}
                      >
                        Download
                      </MenuItem>
                    ) : null}
                    <MenuItem
                      data={{ action: 'OpenDiscussion', file: elem }}
                      onClick={handleClick}
                    >
                      Open Discussion
                    </MenuItem>
                    <MenuItem divider />
                  </div>
                ) : null}
                {adminper === null || adminper.delete ? (
                  <MenuItem
                    data={{ action: 'Delete', file: elem }}
                    onClick={handleClick}
                  >
                    Delete
                  </MenuItem>
                ) : null}
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
  drives: PropTypes.object.isRequired,
  deletefolder: PropTypes.func.isRequired,
  deletefile: PropTypes.func.isRequired,
  findfolder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
  drives: state.drives,
  loading: state.loading,
});

export default connect(mapStateToProps, {
  deletefolder,
  deletefile,
  findfolder,
})(ShowFileSystem);
