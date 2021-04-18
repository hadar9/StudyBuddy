import React from 'react';
import { Image, Col, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { choosefolder, choosefile } from '../../../../../../actions/filesystem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/*import files pic*/
import avi from '../../../../../../img/files/avi.png';
import csv from '../../../../../../img/files/csv.png';
import pdf from '../../../../../../img/files/pdf.png';
import jpg from '../../../../../../img/files/jpg.png';
import doc from '../../../../../../img/files/doc.png';
import docx from '../../../../../../img/files/docx.png';
import mp3 from '../../../../../../img/files/mp3.png';
import mp4 from '../../../../../../img/files/mp4.png';
import png from '../../../../../../img/files/png.png';
import ppt from '../../../../../../img/files/ppt.png';
import rar from '../../../../../../img/files/rar.png';
import txt from '../../../../../../img/files/txt.png';
import zip from '../../../../../../img/files/zip.png';
import folderimg from '../../../../../../img/folder.png';

function ShowSystem({
  elem,
  choosefolder,
  choosefile,
  filesystem: { deletefilestatus, deletefile },
}) {
  const images = {
    avi,
    csv,
    pdf,
    jpg,
    doc,
    docx,
    mp3,
    mp4,
    png,
    ppt,
    rar,
    txt,
    zip,
  };

  const showfilecontent = (e) => {
    choosefile(elem);
    let url = elem.url;
    if (elem.objtype === 'pdf') {
      url = url + '#toolbar=0';
    }
    window.open(url);
  };

  return (
    <div>
      <div className='showfilesystem text-center'>
        <Col>
          {elem.objtype === 'folder' ? (
            <Button variant='light' onClick={(e) => choosefolder(elem)}>
              {deletefilestatus && deletefile === elem._id ? (
                <Spinner
                  className='filespinner'
                  animation='border'
                  variant='dark'
                ></Spinner>
              ) : null}
              <Image className='folderimg' src={folderimg}></Image>
            </Button>
          ) : (
            <Button
              variant='light'
              onClick={(e) => {
                showfilecontent(e);
              }}
            >
              {deletefilestatus && deletefile === elem._id ? (
                <Spinner
                  className='filespinner'
                  animation='border'
                  variant='dark'
                ></Spinner>
              ) : null}
              <Image className='fileimg' src={images[`${elem.objtype}`]} />
            </Button>
          )}

          <p className='filetext'>{elem.name}</p>
        </Col>
      </div>
    </div>
  );
}

ShowSystem.propTypes = {
  filesystem: PropTypes.object.isRequired,
  choosefolder: PropTypes.func.isRequired,
  choosefile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filesystem: state.filesystem,
});

export default connect(mapStateToProps, { choosefolder, choosefile })(
  ShowSystem
);
