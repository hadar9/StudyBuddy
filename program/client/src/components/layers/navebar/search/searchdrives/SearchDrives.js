import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Join from './operations/Join';
import Leave from './operations/Leave';
import DeleteReq from './operations/DeleteReq';

function SearchDrives({ drive: { searchdrives, drivessearchloading } }) {
  let pros;
  if (drivessearchloading) {
    pros = searchdrives.map((pro, index) => {
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
            <h6 className='mr-3 mt-3'>{`drive buddies: ${pro.buddiescount}`}</h6>
            <div className='mr-3 mt-2'>{btn}</div>
            <h5 className='mr-3 mt-3'>{pro.driveowner.username} </h5>
            <h3 className='mr-2 mt-2'>{pro.drivename}</h3>
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
