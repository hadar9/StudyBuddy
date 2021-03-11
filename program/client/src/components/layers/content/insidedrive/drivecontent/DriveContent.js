import React from 'react';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';
import ShowFileSystem from './ShowFileSystem';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeneralMessage from './GeneralMessage';

function DriveContent({ filesystem: { folder, folderloading } }) {
  return (
    <div className='drivecontent'>
      <h1 className='insidedrivecontent-title'>{folder.name}</h1>
      <div className='mydrivesopreations'>
        <GeneralMessage folder={folder} />
        <Row>
          <UploadFile folder={folder} />
          <CreateFolder folder={folder} />
        </Row>
      </div>
      <div className='showfilesystems '>
        <ShowFileSystem folder={folder} folderloading={folderloading} />
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
