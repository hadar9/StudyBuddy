import React, { useState } from 'react';
import { Image, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import fileimg from '../../../../../../img/file.png';
import folderimg from '../../../../../../img/folder.png';
import { choosefolder, choosefile } from '../../../../../../actions/filesystem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ShowSystem({ elem, choosefolder, choosefile }) {
  const [showfile, setfile] = useState(false);

  const showfilecontent = (e) => {
    choosefile(elem);
    window.open(
      elem.url,
      '',
      'fullscreen=no,menubar=no,titlebar=no,scrollbars=1,resizable=1,location=1,toolbar=no'
    );

    setfile(true);
  };

  return (
    <div>
      <div className='showfilesystem text-center'>
        <Col>
          {elem.objtype === 'folder' ? (
            <Button variant='light' onClick={(e) => choosefolder(elem)}>
              <Image className='folderimg' src={folderimg} />
            </Button>
          ) : (
            <Button
              variant='light'
              onClick={(e) => {
                showfilecontent(e);
              }}
            >
              <Image className='fileimg' src={fileimg} />
            </Button>
          )}
          <p
            style={{
              whiteSpace: 'nowrap',
              color: 'black',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '150px',
            }}
          >
            {elem.name}
          </p>
        </Col>
      </div>
    </div>
  );
}

ShowSystem.propTypes = {
  choosefolder: PropTypes.func.isRequired,
  choosefile: PropTypes.func.isRequired,
};

export default connect(null, { choosefolder, choosefile })(ShowSystem);
