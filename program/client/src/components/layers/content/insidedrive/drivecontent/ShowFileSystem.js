import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { deletefolder, deletefile } from '../../../../../actions/filesystem';

function downloadFile(url, filename) {
  fetch(url).then(function(t) {
      return t.blob().then((b)=>{
          var a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", filename);
          a.click();
      }
      );
  });
  }

const DisplayFile = async(url) =>
{
  
    window.open(url);
};

function ShowFileSystem({
  filesystem: { folder, folderloading },
  drives: { adminper },
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

    switch(data.action)
    {
      case 'RemoveFile':
        if (data.file.objtype === 'folder') {
          deletefolder(data.file);
        } else {
          deletefile(data.file);
        }
        break;
      case 'OpenFile':
        DisplayFile(data.file.url)
        break;
      case 'DownloadFile':
        downloadFile(data.file.url, data.file.name);
        break;


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

                <MenuItem
                  data={{ action: 'OpenFile', file: elem }}
                  onClick={handleClick}
                >
                  Open File
                </MenuItem>
                <MenuItem
                  data={{ action: 'OpenDiscussion', file: elem }}
                  onClick={handleClick}
                >
                  Open Discussion
                </MenuItem>
                <MenuItem divider />
                <MenuItem
                  data={{ action: 'RemoveFile', file: elem }}
                  onClick={handleClick}
                >
                  Remove File
                </MenuItem>
                <MenuItem data={{ action: 'DownloadFile', file: elem }} onClick={handleClick}>
                  Download
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
  drives: PropTypes.object.isRequired,
  deletefolder: PropTypes.func.isRequired,
  deletefile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
  drives: state.drives,
});

export default connect(mapStateToProps, { deletefolder, deletefile })(
  ShowFileSystem
);
