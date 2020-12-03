import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Figure, Row, Button } from 'react-bootstrap';
import { getuserprofile } from '../../actions/profile';
import 'bootstrap/dist/css/bootstrap.css';
import OtherProfile from './OtherProfile';

function Profiels({ getuserprofile, profile: { loading, profiels } }) {
  const [formData, setForm] = useState({
    profilenotchoose: false,
  });

  const { profilenotchoose } = formData;

  const onclick = (e) => {
    getuserprofile(e.target.value);
    setForm({ profilenotchoose: true });
  };

  const pros = profiels.map((pro) => {
    return (
      <Fragment>
        <div key={pro._id}>
          <Row>
            <Figure>
              <Figure.Image width={100} height={180} src={pro.avatar} rounded />
            </Figure>
            <h4>{pro.user.username}</h4>
            <Button
              key={pro._id}
              value={pro.user._id}
              size='sm'
              onClick={(e) => onclick(e)}
            >
              show profile
            </Button>
          </Row>
        </div>
      </Fragment>
    );
  });
  if (profilenotchoose === true && loading === true) {
    return (
      <div>
        <OtherProfile />
      </div>
    );
  } else {
    return <div>{pros}</div>;
  }
}

Profiels.propTypes = {
  profile: PropTypes.object.isRequired,
  getuserprofile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getuserprofile })(Profiels);
