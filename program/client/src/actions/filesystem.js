import axios from 'axios';
import {
  CREATE_FOLDER,
  ERROR_FOLDER,
  CHOOSE_FILESYSTEM,
  CLEAR_FILESYSTEM,
} from '../actions/types';
/*
export const getfolder = () => async (dispatch) => {
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
*/
export const createfolder = (parent, foldername, url) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    parent,
    foldername,
    url,
  });
  try {
    const res = await axios.post('/api/filesystem/createfolder', body, config);
    dispatch({
      type: CREATE_FOLDER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_FOLDER,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const choosefilesystem = (filesystem) => async (dispatch) => {
  console.log(filesystem);
  dispatch({
    type: CHOOSE_FILESYSTEM,
    payload: filesystem,
  });
};
export const clearfilesystem = () => async (dispatch) => {
  dispatch({
    type: CLEAR_FILESYSTEM,
  });
};
