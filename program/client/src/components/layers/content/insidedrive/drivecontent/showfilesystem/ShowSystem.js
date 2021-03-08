import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import fileimg from '../../../../../../img/file.png';
import folderimg from '../../../../../../img/folder.png';
import { choosefilesystem } from '../../../../../../actions/filesystem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ShowSystem({ elem, choosefilesystem }) {
  return (
    <div className='showdrive text-center'>
      <Col>
        <Button  className="filessystemimgs"variant='light' onClick={(e) => choosefilesystem(elem)}>
          {elem.objtype === 'folder' ? (
            <Image className='folderimg' src={folderimg} />
          ) : (
            <Image className='fileimg' src={fileimg} />
          )}
        </Button>
        <p>{elem.name}</p>
      </Col>
    </div>
  );
}

ShowSystem.propTypes = {
  choosefilesystem: PropTypes.func.isRequired,
};

export default connect(null, { choosefilesystem })(ShowSystem);
