import axios from 'axios';
import { v4 as uuid } from 'uuid';
import tempfolder from '../txtfile/studybuddy.json';
import firebase from '../utils/firebase';
import {
  DELETE_FOLDER,
  DELETE_FILE,
  CREATE_FOLDER,
  ERROR_FOLDER,
  CREATE_FILE,
  ERROR_FILE,
  CHOOSE_FOLDER,
  CHOOSE_FILE,
  CLEAR_FILE,
  EDIT_MESSAGE,
  ERROR_MESSAGE,
  CLEAR_FILESYSTEM,
} from '../actions/types';

export const createfolder = (parent, foldername) => async (dispatch) => {
  const id = uuid();

  const DriveRef = firebase
    .storage()
    .ref(parent.path + `/${foldername}`)
    .child(id);
  await DriveRef.put(tempfolder);
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
export const createfile = (parent, filename, file) => async (dispatch) => {
  const id = uuid();
  const DriveRef = firebase.storage().ref(parent.path).child(id);
  await DriveRef.put(file);
  const fileurl = await DriveRef.getDownloadURL();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    parent,
    filename,
    fileurl,
  });
  try {
    const res = await axios.post('/api/filesystem/createfile', body, config);
    dispatch({
      type: CREATE_FILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_FILE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const choosefolder = (folder) => async (dispatch) => {
  if (folder.objtype === 'drive') {
    dispatch({
      type: CHOOSE_FOLDER,
      payload: folder,
    });
  } else {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      folderid: folder._id,
    });
    try {
      const res = await axios.post(
        '/api/filesystem/choosefolder',
        body,
        config
      );
      dispatch({
        type: CHOOSE_FOLDER,
        payload: res.data,
      });
      dispatch(clearfile());
    } catch (error) {
      dispatch({
        type: ERROR_FOLDER,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

export const deletefolder = (folder, type = 'final') => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const children = [...folder.children];

  try {
    for (let i = 0; i < children.length; i++) {
      let child_id = children[i];
      const body = JSON.stringify({
        id: child_id,
      });
      const child_obj = await axios.post(
        '/api/filesystem/folderchild',
        body,
        config
      );
      if (child_obj.data.objtype === 'folder') {
        await dispatch(deletefolder(child_obj.data, null));
      } else {
        await dispatch(deletefile(child_obj.data, null));
      }
    }

    if (folder.objtype === 'folder') {
      await dispatch(deletefile(folder, type));
      if (type === 'final') {
        await dispatch({
          type: DELETE_FOLDER,
        });
      }
    }
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletefile = (file, type = 'final') => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    file,
  });
  try {
    await firebase.storage().refFromURL(file.url).delete();
    const res = await axios.post('/api/filesystem/deletefile', body, config);
    if (type === 'final') {
      dispatch({
        type: DELETE_FILE,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const choosefile = (file) => async (dispatch) => {
  dispatch({
    type: CHOOSE_FILE,
    payload: file,
  });
};

export const clearfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_FILE,
  });
};

export const findfolder = (path) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    path: path,
  });
  const folder_obj = await axios.post(
    '/api/filesystem/findfolder',
    body,
    config
  );
  if (folder_obj.data) {
    dispatch(choosefolder(folder_obj.data));
  }
};

export const editmessage = (folder, message) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    folder,
    message,
  });
  try {
    await axios.post('/api/filesystem/editmessage', body, config);
    dispatch({
      type: EDIT_MESSAGE,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const clearfilesystem = () => async (dispatch) => {
  dispatch({
    type: CLEAR_FILESYSTEM,
  });
};
