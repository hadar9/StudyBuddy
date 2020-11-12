import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, playload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', playload);
      return {
        ...state,
        ...playload,
        isAuthenticated: true,
        loading: true,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      console.log(type);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
      };
    default:
      return state;
  }
}
