import {
  GET_USER_PROFILE,
  CLOSE_USER_PROFILE,
  CLEAR_BUDDY,
  GET_MYBUDDIES,
  CLOSE_MYBUDDIES,
  ADD_BUDDY,
  CONFIRM_BUDDY,
  DELETE_BUDDY,
  BUDDIES_ERROR,
} from '../actions/types';

const initialState = {
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
