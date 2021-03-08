import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowSystem from './showfilesystem/ShowSystem';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function ShowFileSystem({ filesystems: { filesystem, filesystemloading } }) {
  let myfilesystem;
  if (
    filesystem.objtype === 'folder' ||
    (filesystem.objtype === 'drive' && filesystem.children.length > 0)
  ) {
    myfilesystem = filesystem.children.map((elem) => (
      <Row>
        <ShowSystem key={elem.id} elem={elem} />
      </Row>
    ));
  }
  return <div>{filesystemloading ? <div>{myfilesystem}</div> : null}</div>;
}
ShowFileSystem.propTypes = {
  filesystems: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filesystems: state.filesystem,
});

export default connect(mapStateToProps)(ShowFileSystem);
