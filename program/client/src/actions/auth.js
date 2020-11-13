import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import axios from 'axios';
import { setalert, deletealert } from './alert';

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
    dispatch(setalert('register success!', 'success'));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setalert(error.response.data.msg, 'danger'));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
