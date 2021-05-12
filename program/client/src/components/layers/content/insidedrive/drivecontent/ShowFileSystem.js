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
  filedisaddmessage,
  clearfile,
} from '../../../../../actions/filesystem';
import NameAvatar from '../../general/buddies/tabs/NameAvatar';

function ShowFileSystem({
  filesystem: { folder, folderloading, file, fileloading },
  drives: { adminper },
  deletefolder,
  deletefile,
  findfolder,
  deletefiletrue,
  renamefile,
  filedisaddmessage,
  clearfile,
}) {
  const [editname, seteditname] = useState({
    newname: '',
    changename: false,
    filec: null,
  });

  const [opendiscussion, setdiscussion] = useState({
    newmessage: '',
    opendiss: false,
    filedis: null,
  });

  const { newname, changename, filec } = editname;
  const { newmessage, opendiss, filedis } = opendiscussion;

  useEffect(() => {}, [folder, filedis]);
  //Context bar handler
  function handleClick(e, data) {
    switch (data.action) {
      case 'Delete':
        if (data.file.objtype === 'folder') {
          deletefiletrue(data.file);
          deletefolder(data.file);
        } else {
          deletefiletrue(data.file);
          deletefile(data.file);
        }
        break;
      case 'Rename':
        seteditname({ ...editname, changename: true, filec: data.file });
        break;
      case 'OpenDiscussion':
        setdiscussion({
          ...opendiscussion,
          opendiss: true,
          filedis: data.file,
        });
        break;
      //download
      default:
        break;
    }
  }

  const disscutionNewMessage = async (e) => {
    e.preventDefault();
    await filedisaddmessage(filedis, newmessage);
    setdiscussion({
      ...opendiscussion,
      newmessage: '',
      filedis: file,
    });
  };

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

  if (folder.children.length > 0 && folderloading) {
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
                    <Modal
                      show={opendiss === true}
                      onHide={(e) => {
                        clearfile();
                        setdiscussion({
                          ...opendiscussion,
                          newmessage: '',
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
                        <Modal.Title className='modaltitle'>
                          {filedis !== null ? `${filedis.name}` : null}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='discussion-history'>
                          {filedis !== null
                            ? filedis.discussion.map((elem, index) => (
                                <div key={index}>
                                  <Row
                                    style={{
                                      float: 'right',
                                      marginRight: '15px',
                                    }}
                                  >
                                    <h6 className='pr-5'>{elem.date}</h6>
                                    <NameAvatar
                                      username={elem.sender.username}
                                      avatar={elem.sender.avatar}
                                    />
                                  </Row>
                                  <p
                                    style={{
                                      textAlign: 'right',
                                      paddingTop: '60px',
                                      width: '100%',
                                      overflowWrap: 'break-word',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    {elem.content}
                                  </p>
                                </div>
                              ))
                            : null}
                        </div>
                        <div className='discussion-new-mes'></div>
                        <Form
                          className='text-center'
                          onSubmit={(e) => disscutionNewMessage(e)}
                        >
                          <Form.Group controlId='formBasictext'>
                            <Form.Control
                              type='text'
                              placeholder='new message'
                              onChange={(e) =>
                                setdiscussion({
                                  ...opendiscussion,
                                  newmessage: e.target.value,
                                })
                              }
                              required
                            />
                          </Form.Group>
                          <Button variant='info' type='submit'>
                            New Message
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                ) : null}
                {adminper === null || adminper.rename ? (
                  <div>
                    <MenuItem
                      data={{ action: 'Rename', file: elem }}
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
  deletefiletrue: PropTypes.func.isRequired,
  renamefile: PropTypes.func.isRequired,
  filedisaddmessage: PropTypes.func.isRequired,
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
  filedisaddmessage,
  clearfile,
})(ShowFileSystem);
