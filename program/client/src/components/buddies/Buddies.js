import React, { Fragment, useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Mybuddies from './Mybuddies';
import { getmybuddies } from '../../actions/buddies';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Buddies({ getmybuddies }) {
  const [key, setKey] = useState('mybuddies');
  useEffect(() => {
    getmybuddies();
  }, []);
  return (
    <div className='text-center'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey='mybuddies' title='My buddies'>
          <Mybuddies />
        </Tab>
        <Tab eventKey='sent request' title='Sent request'></Tab>
        <Tab eventKey='buddyrequest' title='Buddy request'></Tab>
      </Tabs>
    </div>
  );
}
Buddies.propTypes = {
  buddiess: PropTypes.object.isRequired,
  getmybuddies: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, { getmybuddies })(Buddies);
