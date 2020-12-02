import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Profiels({ profile: { profiels } }) {
  const pros = profiels.map((pro) => {
    console.log(pro);
    return (
      <div key={pro._id}>
        <Row>
          <Col xs={6} md={2}>
            <Image src={pro.avatar} roundedCircle />
          </Col>
          <h4>{pro.user.username}</h4>
          <Button>show profile</Button>
        </Row>
      </div>
    );
  });
  return <div className='disp text-center'>{pros}</div>;
}

Profiels.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(Profiels);
