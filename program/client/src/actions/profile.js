import axios from 'axios';
import { setalert } from './alert';
import {
  GET_PROFILE,
  GET_USER_PROFILE,
  CLOSE_USER_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_PICTUER,
  UPDATE_PROFILE,
  GET_PROFILES_WITH_USERNAME,
  CLOSE_PROFILES_WITH_USERNAME,
  CLEAR_PROFILE,
} from '../actions/types';

//get my profile
export const getmyprofile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// update profile pictuer
export const updateprofilepictuer = (avatar) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      avatar,
    });

    const res = await axios.post('/api/profile/pictuer', body, config);
    dispatch({
      type: UPDATE_PROFILE_PICTUER,
      payload: res.data,
    });
    dispatch(setalert('changes saved!', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    dispatch(setalert('Error editing!', 'danger'));
  }
};

// update profile
export const updateprofile = ({
  firstname,
  lastname,
  studyat,
  studyfield,
}) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      firstname,
      lastname,
      studyat,
      studyfield,
    });

    const res = await axios.post('/api/profile', body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setalert('changes saved!', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    dispatch(setalert('Error editing!', 'danger'));
  }
};
//Get all profiles with the username
export const getprofiels = (username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      username,
    });

    const res = await axios.post('/api/profile/profiels', body, config);
    dispatch({
      type: GET_PROFILES_WITH_USERNAME,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//close all profiels
export const closeprofiles = () => async (dispatch) => {
  dispatch({
    type: CLOSE_PROFILES_WITH_USERNAME,
  });
};

//Get specific profile with the user id
export const getuserprofile = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      id,
    });

    const res = await axios.post('/api/profile/userprofile', body, config);
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//close spesfic user profiel
export const closeuserprofile = () => async (dispatch) => {
  dispatch({
    type: CLOSE_USER_PROFILE,
  });
};

export const clearprofile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
