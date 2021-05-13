import {
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
  DELETE_FILE,
  DELETE_FILE_TRUE,
  DELETE_FILE_FALSE,
  RENAME_FILE,
  FILE_DISS_ADD_NEW_MESSAGE,
} from '../actions/types';

const initialState = {
  folder: {},
  folderloading: false,
  file: null,
  fileloading: false,
  filestatus: null,
  error: {},
};

export default function filesystem(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FOLDER:
    case CHOOSE_FOLDER:
    case CREATE_FILE:
    case RENAME_FILE:
    case DELETE_FILE:
      return {
        ...state,
        folder: payload,
        folderloading: true,
      };

    case DELETE_FILE_FALSE:
    case CLEAR_FILE: {
      return {
        ...state,
        fileloading: false,
        file: null,
        filestatus: null,
      };
    }
    case DELETE_FILE_TRUE: {
      return {
        ...state,
        file: payload,
        fileloading: true,
        filestatus: 'delete',
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
        file: null,
        fileloading: false,
        filestatus: null,
        error: payload,
      };
    case CHOOSE_FILE:
      return {
        ...state,
        file: payload,
        fileloading: true,
      };
    case FILE_DISS_ADD_NEW_MESSAGE:
      return {
        ...state,
        file: payload,
        fileloading: true,
        filestatus: 'disssuction',
      };
    case CLEAR_FILESYSTEM:
      return {
        folder: {},
        folderloading: false,
        file: null,
        fileloading: false,
        filestatus: null,
        error: {},
      };

    default:
      return state;
  }
}
