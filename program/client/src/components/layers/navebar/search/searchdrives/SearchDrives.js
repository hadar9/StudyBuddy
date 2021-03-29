import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NameAvatar from '../../../content/general/buddies/tabs/NameAvatar';

function SearchDrives({ drive: { drives, drivesloading } }) {
  let pros;
  if (drivesloading) {
    pros = drives.map((pro, index) => (
      <Fragment key={index}>
        <Row>
          <h5>{pro.user.username} </h5>
          <h1>{pro.name}</h1>
        </Row>
      </Fragment>
    ));
  }

  return <div className='searchcontent'>{pros}</div>;
}

SearchDrives.propTypes = {
  drive: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  drive: state.drives,
});
export default connect(mapStateToProps, {})(SearchDrives);
