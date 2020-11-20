import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

export const getmyprofile = () => async (dispatch) => {
  try {
    const res = axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg:error.response.statusText,status:error.response:status},
    });
  }
};
