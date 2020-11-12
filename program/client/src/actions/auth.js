import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import axios from 'axios';

//Register
export const register = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    username,
    email,
    password,
  });

  try {
    const res = await axios.post('api/auth/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
