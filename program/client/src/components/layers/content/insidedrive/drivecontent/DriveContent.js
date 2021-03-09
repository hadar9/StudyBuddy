import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import ShowFileSystem from './ShowFileSystem';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DriveContent({ filesystems: { filesystem } }) {
  return (
    <div className='drivecontent'>
      <h1 className='insidedrivecontent-title'>{filesystem.name}</h1>
      <div className='mydrivesopreations'>
        <Row>
          <UploadFile />
          <CreateFolder />
        </Row>
      </div>
      <div className='showfilesystems '>
        <ShowFileSystem />
      </div>
    </div>
  );
}
DriveContent.propTypes = {
  filesystems: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  filesystems: state.filesystem,
});

export default connect(mapStateToProps, {})(DriveContent);
