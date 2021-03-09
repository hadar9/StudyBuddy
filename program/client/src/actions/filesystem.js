import axios from 'axios';
import { v4 as uuid } from 'uuid';
import file1 from '../txtfile/studybuddy.json';
import firebase from '../utils/firebase';
import {
  CREATE_FILESYSTEM,
  ERROR_CREATE_FILESYSTEM,
  CHOOSE_FILESYSTEM,
  CLEAR_FILESYSTEM,
} from '../actions/types';

export const createfilesystem = (parent, foldername, type, file) => async (
  dispatch
) => {
  const id = uuid();
  let DriveRef;
  if (type === 'folder') {
    DriveRef = firebase
      .storage()
      .ref(parent.path + `/${foldername}`)
      .child(id);
    await DriveRef.put(file1);
  } else {
    DriveRef = firebase.storage().ref(parent.path).child(id);
    await DriveRef.put(file);
  }
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
    type,
  });
  try {
    const res = await axios.post(
      '/api/filesystem/createfilesystem',
      body,
      config
    );
    parent.children.push(res.data);

    dispatch({
      type: CREATE_FILESYSTEM,
      payload: parent,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CREATE_FILESYSTEM,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const choosefilesystem = (filesystem) => async (dispatch) => {
  if (filesystem.objtype !== 'file') {
    dispatch({
      type: CHOOSE_FILESYSTEM,
      payload: filesystem,
    });
  }
};
export const clearfilesystem = () => async (dispatch) => {
  dispatch({
    type: CLEAR_FILESYSTEM,
  });
};
