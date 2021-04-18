import {
  CREATE_FOLDER,
  ERROR_FOLDER,
  CREATE_FILE,
  UPLOAD_FILE_TRUE,
  UPLOAD_FILE_FALSE,
  ERROR_FILE,
  CHOOSE_FOLDER,
  CHOOSE_FILE,
  CLEAR_FILE,
  EDIT_MESSAGE,
  ERROR_MESSAGE,
  CLEAR_FILESYSTEM,
  DELETE_FILE,
  DELETE_FILE_TRUE,
  DELETE_FILE_FALSE,
} from '../actions/types';

const initialState = {
  folder: {},
  folderloading: false,
  file: {},
  fileloading: false,
  fileopstatus: false,
  fileop: null,
  error: {},
};

export default function filesystem(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FOLDER:
    case CHOOSE_FOLDER:
    case CREATE_FILE:
      return {
        ...state,
        folder: payload,
        folderloading: true,
      };
    case UPLOAD_FILE_TRUE: {
      return {
        ...state,
        fileopstatus: true,
        fileop: 'upload',
      };
    }
    case DELETE_FILE_FALSE:
    case UPLOAD_FILE_FALSE: {
      return {
        ...state,
        fileopstatus: false,
        fileop: null,
      };
    }
    case DELETE_FILE_TRUE: {
      return {
        ...state,
        fileopstatus: true,
        fileop: payload,
      };
    }

    case DELETE_FILE: {
      return {
        ...state,
        folder: payload,
        folderloading: true,
      };
    }
    case EDIT_MESSAGE:
      return {
        ...state,
        folder: { ...state.folder, message: payload },
      };
    case ERROR_FOLDER:
    case ERROR_MESSAGE:
    case ERROR_FILE:
      return {
        folder: {},
        folderloading: false,
        file: {},
        fileloading: false,
        fileopstatus: false,
        fileop: null,
        error: payload,
      };
    case CHOOSE_FILE:
      return {
        ...state,
        file: payload,
        fileloading: true,
      };
    case CLEAR_FILE:
      return {
        ...state,
        file: [],
        fileloading: false,
      };
    case CLEAR_FILESYSTEM:
      return {
        folder: {},
        folderloading: false,
        file: {},
        fileloading: false,
        fileopstatus: false,
        fileop: null,
        error: {},
      };

    default:
      return state;
  }
}
