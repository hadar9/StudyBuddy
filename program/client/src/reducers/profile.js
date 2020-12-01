import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: true };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false };
    default:
      return state;
  }
}
