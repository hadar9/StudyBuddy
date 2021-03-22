import React from 'react';
import Contact from './Contact';
import SearchContact from './SearchContact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function SideBar({ buddiess: { mybuddies, mybuddieslsloading } }) {
  const contacts = mybuddies.map((contact, index) => (
    <Contact key={index} contact={contact} />
  ));

  return (
    <div className='sidebar'>
      <SearchContact />
      {mybuddieslsloading ? (
        <div className='contactmessages'>{contacts}</div>
      ) : null}
    </div>
  );
}

SideBar.propTypes = {
  buddiess: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  buddiess: state.buddies,
});
export default connect(mapStateToProps, {})(SideBar);
