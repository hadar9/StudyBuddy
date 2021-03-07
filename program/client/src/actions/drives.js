import axios from 'axios';
import { GET_DRIVES, CREATE_DRIVE_ERROR, CLEAR_DRIVES } from './types';

export const getdrives = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/drives/getmydrives');
    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createdrive = (drivename) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    drivename,
  });
  try {
    await axios.post('/api/drives/createdrive', body, config);
    dispatch(getdrives());
  } catch (error) {
    console.log('errro');
  }
};
export const cleardrives = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DRIVES,
  });
};
