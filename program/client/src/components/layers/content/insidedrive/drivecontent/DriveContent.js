import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import ShowFileSystem from './ShowFileSystem';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeneralMessage from './GeneralMessage';

function DriveContent({ filesystem: { folder }, drives: { adminper } }) {
  
  return (
    <div className='drivecontent'>
      <h1 className='insidedrivecontent-title'>{folder.name}</h1>
      <GeneralMessage />
      <div className='insidemydrivesopreations'>
        <Row>
          {adminper === null || adminper.upload ? <UploadFile /> : null}
          {adminper === null || adminper.createfolder ? <CreateFolder /> : null}
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
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
  drives: state.drives,
});

export default connect(mapStateToProps, {})(DriveContent);
