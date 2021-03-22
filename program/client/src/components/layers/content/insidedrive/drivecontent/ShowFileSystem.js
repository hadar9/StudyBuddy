import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function ShowFileSystem({ filesystem: { folder, folderloading } }) {
  let myfilesystem;
  if (folder.children.length > 0) {
    myfilesystem = folder.children.map((elem) => (
      <Row>
        <ShowSystem key={elem._id} elem={elem} />
      </Row>
    ));
  }

  return <div>{folderloading ? <div>{myfilesystem}</div> : null}</div>;
}
ShowFileSystem.propTypes = {
  filesystem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps)(ShowFileSystem);
