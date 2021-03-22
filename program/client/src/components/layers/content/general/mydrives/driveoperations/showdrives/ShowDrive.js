import React from 'react';
import { Image, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import img from '../../../../../../../img/storage.png';
import { choosedrive } from '../../../../../../../actions/drives';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ShowDrive({ elem, choosedrive }) {
  return (
    <div className='showdrive text-center'>
      <Col>
        <Button variant='light' onClick={(e) => choosedrive(elem)}>
          <Image className='driveimg' src={img} />
        </Button>
        <p style={{ color: 'black' }}>{elem.name}</p>
      </Col>
    </div>
  );
}

ShowDrive.propTypes = {
  choosedrive: PropTypes.func.isRequired,
};

export default connect(null, { choosedrive })(ShowDrive);
