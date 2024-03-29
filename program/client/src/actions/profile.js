import axios from 'axios';
import { setalert } from './alert';
import { v4 as uuid } from 'uuid';
import firebase from '../utils/firebase';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_PICTUER,
  UPDATE_PROFILE,
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
  const id = uuid();
  const DriveRef = firebase.storage().ref('images').child(id);
  await DriveRef.put(avatar);
  const fileurl = await DriveRef.getDownloadURL();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    fileurl,
  });
  try {
    const res = await axios.post('api/profile/pictuer', body, config);

    dispatch({
      type: UPDATE_PROFILE_PICTUER,
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

export const clearprofile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
