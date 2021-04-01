import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Join from './operations/Join';
import Leave from './operations/Leave';
import DeleteReq from './operations/DeleteReq';

function SearchDrives({ drive: { drives, drivesloading } }) {
  let pros;
  if (drivesloading) {
    pros = drives.map((pro, index) => {
      let btn;
      if (pro.buddystatus === 'nothing') {
        btn = <Join selecteddrive={pro.driveid} />;
      } else if (pro.buddystatus === 'request') {
        btn = <DeleteReq selecteddrive={pro.driveid} />;
      } else {
        btn = <Leave selecteddrive={pro.driveid} />;
      }
      return (
        <Fragment key={index}>
          <Row>
            <h6>{`drive buddies: ${pro.buddiescount}`}</h6>
            {btn}
            <h5>{pro.driveowner.username} </h5>
            <h1>{pro.drivename}</h1>
          </Row>
        </Fragment>
      );
    });
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
