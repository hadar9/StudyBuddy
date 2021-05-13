import React from 'react';
import { Image, Col, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import img from '../../../../../../../img/storage.png';
import { choosedrive } from '../../../../../../../actions/drives';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ShowDrive({ elem, choosedrive, filesystem: { filestatus, file } }) {
  return (
    <div className='showdrive text-center'>
      <Col>
        <Button variant='light' onClick={(e) => choosedrive(elem)}>
          {filestatus === 'delete' && file._id === elem._id ? (
            <Spinner
              className='filespinner'
              animation='border'
              variant='dark'
            ></Spinner>
          ) : null}
          <Image className='driveimg' src={img} />
        </Button>
        <p style={{ color: 'black' }}>{elem.name}</p>
      </Col>
    </div>
  );
}

ShowDrive.propTypes = {
  filesystem: PropTypes.object.isRequired,
  choosedrive: PropTypes.func.isRequired,
  drives: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drives: state.drives,
  filesystem: state.filesystem,
});

export default connect(mapStateToProps, { choosedrive })(ShowDrive);
