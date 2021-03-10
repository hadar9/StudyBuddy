import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import fileimg from '../../../../../../img/file.png';
import folderimg from '../../../../../../img/folder.png';
import { choosefolder, choosefile } from '../../../../../../actions/filesystem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ShowSystem({ elem, choosefolder, choosefile }) {
  return (
    <div className='showfilesystem text-center'>
      <Col>
        {elem.objtype === 'folder' ? (
          <Button variant='light' onClick={(e) => choosefolder(elem)}>
            <Image className='folderimg' src={folderimg} />
          </Button>
        ) : (
          <Button variant='light' onClick={(e) => choosefile(elem)}>
            <Image className='fileimg' src={fileimg} />
          </Button>
        )}
        <p style={{ color: 'black' }}>{elem.name}</p>
      </Col>
    </div>
  );
}

ShowSystem.propTypes = {
  choosefolder: PropTypes.func.isRequired,
  choosefile: PropTypes.func.isRequired,
};

export default connect(null, { choosefolder, choosefile })(ShowSystem);
