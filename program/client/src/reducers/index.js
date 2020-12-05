import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import buddies from './buddies';

export default combineReducers({
  auth,
  alert,
  profile,
  buddies,
});
