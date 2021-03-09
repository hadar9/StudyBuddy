import axios from 'axios';
import { v4 as uuid } from 'uuid';
import file from '../txtfile/studybuddy.json';
import firebase from '../utils/firebase';
import {
  CREATE_FOLDER,
  ERROR_FOLDER,
  CHOOSE_FILESYSTEM,
  CLEAR_FILESYSTEM,
} from '../actions/types';

export const createfolder = (parent, foldername) => async (dispatch) => {
  const id = uuid();
  const DriveRef = firebase
    .storage()
    .ref(parent.path + `/${foldername}`)
    .child(id);
  await DriveRef.put(file);
  const folderurl = await DriveRef.getDownloadURL();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    parent,
    foldername,
    folderurl,
  });
  try {
    const res = await axios.post('/api/filesystem/createfolder', body, config);
    parent.children.push(res.data);

    dispatch({
      type: CREATE_FOLDER,
      payload: parent,
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
