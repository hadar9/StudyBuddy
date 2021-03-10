import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import ShowFileSystem from './ShowFileSystem';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function DriveContent({ filesystem: { folder } }) {
  return (
    <div className='drivecontent'>
      <h1 className='insidedrivecontent-title'>{folder.name}</h1>
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
  filesystem: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps, {})(DriveContent);
