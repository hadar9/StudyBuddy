import axios from 'axios';
import { choosefolder } from './filesystem';
import {
  GET_DRIVES,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  DRIVE_ERROR,
  CHOOSE_DRIVE,
} from './types';

export const getdrives = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/drives/getmydrives');
    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
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
    dispatch({
      type: CREATE_DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const cleardrives = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DRIVES,
  });
};

export const choosedrive = (drive) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    drive,
  });
  try {
    const res = await axios.post('/api/drives/choosedrive', body, config);
    dispatch({
      type: CHOOSE_DRIVE,
      payload: res.data,
    });
    dispatch(choosefolder(res.data));
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
