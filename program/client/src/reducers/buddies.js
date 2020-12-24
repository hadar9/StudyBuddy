import {
  GET_USER_PROFILE,
  CLOSE_USER_PROFILE,
  CLEAR_BUDDY,
  GET_PROFILES_WITH_USERNAME,
  CLOSE_PROFILES_WITH_USERNAME,
  GET_MYBUDDIES,
  CLOSE_MYBUDDIES,
  ADD_BUDDY,
  CONFIRM_BUDDY,
  DELETE_BUDDY,
  BUDDIES_ERROR,
} from '../actions/types';

const initialState = {
  searchbuddies: [],
  searchloading: false,
  searchusername: '',
  mybuddies: [],
  mybuddieslsloading: false,
  userprofile: null,
  userloading: false,
  error: {},
};

export default function buddies(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userprofile: payload,
        userloading: true,
      };
    case GET_PROFILES_WITH_USERNAME:
      return {
        ...state,
        searchloading: true,
        searchbuddies: payload.profiels,
        searchusername: payload.username,
      };
    case CLOSE_PROFILES_WITH_USERNAME:
      return {
        ...state,
        searchloading: false,
        searchbuddies: [],
        searchusername: '',
      };
    case CLOSE_USER_PROFILE:
    case ADD_BUDDY:
    case CONFIRM_BUDDY:
    case DELETE_BUDDY:
      return { ...state, userprofile: null, userloading: false };
    case GET_MYBUDDIES:
      return { ...state, mybuddieslsloading: true, mybuddies: payload };
    case CLOSE_MYBUDDIES:
      return { ...state, mybuddieslsloading: false, mybuddies: [] };
    case BUDDIES_ERROR:
    case CLEAR_BUDDY:
      return {
        searchbuddies: [],
        searchloading: false,
        searchusername: '',
        mybuddies: [],
        mybuddieslsloading: false,
        userprofile: null,
        userloading: false,
        error: {},
      };
    default:
      return state;
  }
}
