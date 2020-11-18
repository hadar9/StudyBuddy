import Navebar from './layers/Navebar';
import HomeMenu from './layers/HomeMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Home({ isAuthenticated }) {
  return (
    <div className='home'>
      {isAuthenticated ? (
        <div>
          <Navebar />
          <div className='content'></div>
          <HomeMenu />
        </div>
      ) : (
        <h1>Forbiten!</h1>
      )}
    </div>
  );
}

Navebar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);
