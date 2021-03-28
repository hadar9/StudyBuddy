import axios from 'axios';
import { SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/types';

//Get all profiles with the username
export const searchbuddies = (username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      username,
    });

    const res = await axios.post('/api/buddies/buddies', body, config);
    dispatch({
      type: SEARCH_SUCCESS,
      payload: { searchres: res.data, searchinput: username },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const searchdrives = (drivename) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      drivename,
    });
    const res = await axios.post('/api/drives/searchdrives', body, config);
    dispatch({
      type: SEARCH_SUCCESS,
      payload: { searchres: res.data, searchinput: drivename },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const clearsearch = () => async (dispatch) => {
  dispatch({
    type: SEARCH_ERROR,
  });
};
