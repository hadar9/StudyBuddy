import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES_WITH_USERNAME,
} from '../actions/types';

const initialState = {
  profile: null,
  profiels: [],
  profielsloading: false,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: true };
    case GET_PROFILES_WITH_USERNAME:
      return { ...state, profielsloading: true, profiels: payload };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profielsloading: false,
        error: payload,
        profiels: [],
      };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false };
    default:
      return state;
  }
}
