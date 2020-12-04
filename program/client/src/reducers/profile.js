import {
  GET_PROFILE,
  GET_USER_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_PICTUER,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES_WITH_USERNAME,
  CLOSE_PROFILES_WITH_USERNAME,
} from '../actions/types';

const initialState = {
  profile: null,
  profiels: [],
  profielsloading: false,
  loading: false,
  userprofile: null,
  userloading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case UPDATE_PROFILE_PICTUER:
      return { ...state, profile: payload, loading: true };
    case GET_USER_PROFILE:
      return { ...state, userprofile: payload, userloading: true };
    case GET_PROFILES_WITH_USERNAME:
      return { ...state, profielsloading: true, profiels: payload };
    case CLOSE_PROFILES_WITH_USERNAME:
      return { ...state, profielsloading: false, profiels: [] };
    case PROFILE_ERROR:
      return {
        profile: null,
        profiels: [],
        profielsloading: false,
        loading: false,
        userprofile: null,
        userloading: false,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiels: [],
        profielsloading: false,
        loading: false,
        userprofile: null,
        userloading: false,
        error: {},
      };
    default:
      return state;
  }
}
