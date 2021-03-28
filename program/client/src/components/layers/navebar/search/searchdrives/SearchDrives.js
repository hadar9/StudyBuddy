import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function SearchDrives({ search: { searchres, searchloading } }) {
  let pros;
  if (searchloading) {
    pros = searchres.map((pro, index) => (
      <Fragment key={index}>
        <Row>
          <h1>{pro.name}</h1>
        </Row>
      </Fragment>
    ));
  }

  return <div className='searchcontent'>{pros}</div>;
}

SearchDrives.propTypes = {
  search: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  search: state.search,
});
export default connect(mapStateToProps, {})(SearchDrives);
