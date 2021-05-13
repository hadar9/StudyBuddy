import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row, Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {
  deletefolder,
  deletefile,
  findfolder,
  deletefiletrue,
  renamefile,
  clearfile,
} from '../../../../../actions/filesystem';
import FileDisscussion from './filedisscution/FileDisscussion';

function ShowFileSystem({
  filesystem: { folder, folderloading, file, fileloading, filestatus },
  drives: { adminper },
  deletefolder,
  deletefile,
  findfolder,
  deletefiletrue,
  renamefile,
  clearfile,
}) {
  const [editname, seteditname] = useState({
    newname: '',
    changename: false,
    filec: null,
  });

  const [opendiscussion, setdiscussion] = useState({
    opendiss: false,
    filedis: null,
  });

  const { newname, changename, filec } = editname;
  const { opendiss, filedis } = opendiscussion;

  useEffect(() => {}, [folder]);
  useEffect(() => {
    if (filestatus === 'disssuction') {
      setdiscussion({
        ...opendiscussion,
        filedis: file,
      });
      clearfile();
    }
  }, [filestatus]);

  //Context bar handler
  function handleClick(e, data) {
    switch (data.action) {
      case 'Delete':
        if (data.filem.objtype === 'folder') {
          deletefiletrue(data.filem);
          deletefolder(data.filem);
        } else {
          deletefiletrue(data.filem);
          deletefile(data.filem);
        }
        break;
      case 'Rename':
        seteditname({ ...editname, changename: true, filec: data.filem });
        break;
      case 'OpenDiscussion':
        setdiscussion({
          ...opendiscussion,
          opendiss: true,
          filedis: data.filem,
        });
        break;
      //download
      default:
        break;
    }
  }

  const onsumbit = async (e) => {
    e.preventDefault();
    await renamefile(filec, newname);
    seteditname({ ...editname, newname: '', changename: false, filec: null });
  };

  function path_callback(dest) {
    findfolder(user + dest);
  }

  function create_path_array(path_array) {
    let paths = [];
    for (let iter = 0; iter < path_array.length; iter++) {
      if (iter === 0) {
        user = path_array[iter];
        paths.push(['']);
      } else paths.push([paths[iter - 1] + '/' + path_array[iter]]);
    }
    return paths;
  }

  let children = false;

  if (folderloading && folder.children.length > 0) {
    children = true;
  }
  var user;
  const paths = create_path_array(folder.path);

  return (
    <div>
      <div className='pathtry'>
        <a className='path'>Path: </a>
        {paths.map((locp, index) => (
          <a
            key={index}
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
            <div key={elem._id}>
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
                        data={{ action: 'Download', filem: elem }}
                        onClick={handleClick}
                      >
                        Download
                      </MenuItem>
                    ) : null}

                    <MenuItem
                      data={{ action: 'OpenDiscussion', filem: elem }}
                      onClick={handleClick}
                    >
                      Open Discussion
                    </MenuItem>
                    <MenuItem divider />
                    <Modal
                      show={opendiss === true}
                      onHide={(e) => {
                        clearfile();
                        setdiscussion({
                          ...opendiscussion,
                          opendiss: false,
                          filedis: null,
                        });
                      }}
                      backdrop='static'
                      keyboard={false}
                      centered
                      contentClassName='custom-modal-style-diss'
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className='modaltitle-style'>
                          {filedis !== null ? `${filedis.name}` : null}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {filedis !== null ? (
                          <FileDisscussion elem={filedis} />
                        ) : null}
                      </Modal.Body>
                    </Modal>
                  </div>
                ) : null}
                {adminper === null || adminper.rename ? (
                  <div>
                    <MenuItem
                      data={{ action: 'Rename', filem: elem }}
                      onClick={handleClick}
                    >
                      Rename
                    </MenuItem>
                    <Modal
                      show={changename === true}
                      onHide={(e) =>
                        seteditname({
                          ...editname,
                          newname: '',
                          changename: false,
                          filec: null,
                        })
                      }
                      backdrop='static'
                      keyboard={false}
                      centered
                      contentClassName='custom-modal-style-rename'
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className='modaltitle'></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form
                          className='text-center'
                          onSubmit={(e) => onsumbit(e)}
                        >
                          <Form.Group controlId='formBasictext'>
                            <Form.Control
                              type='text'
                              placeholder='new name'
                              onChange={(e) =>
                                seteditname({
                                  ...editname,
                                  newname: e.target.value,
                                })
                              }
                              required
                            />
                          </Form.Group>
                          <Button variant='info' type='submit'>
                            Submit
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                ) : null}
                {adminper === null || adminper.delete ? (
                  <MenuItem
                    data={{ action: 'Delete', filem: elem }}
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
  deletefiletrue: PropTypes.func.isRequired,
  renamefile: PropTypes.func.isRequired,
  clearfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
  drives: state.drives,
});

export default connect(mapStateToProps, {
  deletefolder,
  deletefile,
  findfolder,
  deletefiletrue,
  renamefile,
  clearfile,
})(ShowFileSystem);
