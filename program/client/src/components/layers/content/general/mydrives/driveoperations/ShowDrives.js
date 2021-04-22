import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowDrive from './showdrives/ShowDrive';
import { Row, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {
  deletemydrive,
  leavedrive,
  renamedrive,
} from '../../../../../../actions/drives';
import { deletefiletrue } from '../../../../../../actions/filesystem';
function ShowDrives({
  drivestate: { drives, drivesloading, drivestype },
  leavedrive,
  deletemydrive,
  deletefiletrue,
  renamedrive,
}) {
  const [editname, seteditname] = useState({
    newname: '',
    changename: false,
    drivec: null,
  });
  const { newname, changename, drivec } = editname;

  // Context bar handler
  const handleClick = (e, data) => {
    if (drivestype === 'mydrives') {
      switch (data.action) {
        case 'Delete':
          deletefiletrue(data.drive);
          deletemydrive(data.drive);
          break;
        default:
          seteditname({ ...editname, changename: true, drivec: data.drive });
          break;
      }
    } else {
      leavedrive(data.drive._id);
    }
  };

  const onsumbit = async (e) => {
    e.preventDefault();
    await renamedrive(drivec, newname);
    seteditname({ ...editname, newname: '', changename: false, drivec: null });
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
                {drivestype === 'mydrives' ? (
                  <div>
                    <MenuItem
                      data={{ action: 'Rename', drive: elem }}
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
                          drivec: null,
                        })
                      }
                      backdrop='static'
                      keyboard={false}
                      size='sm'
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className='modaltitle'></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {
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
                        }
                      </Modal.Body>
                    </Modal>
                  </div>
                ) : null}
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
  deletefiletrue: PropTypes.func.isRequired,
  renamedrive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drivestate: state.drives,
});

export default connect(mapStateToProps, {
  leavedrive,
  deletemydrive,
  deletefiletrue,
  renamedrive,
})(ShowDrives);
