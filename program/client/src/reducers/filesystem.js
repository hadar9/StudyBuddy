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
  LOADING,
} from '../actions/types';

const initialState = {
  folder: {},
  folderloading: false,
  file: {},
  fileloading: false,
  error: {},
};

export default function filesystem(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FOLDER:
    case CHOOSE_FOLDER:
    case CREATE_FILE:
    case DELETE_FILE:
      return {
        ...state,
        folder: payload,
        folderloading: true,
        loading: false,
      };
    case EDIT_MESSAGE:
      return {
        ...state,
        folder: { ...state.folder, message: payload },
      };
    case ERROR_FOLDER:
    case ERROR_MESSAGE:
    case ERROR_FILE:
      return {
        folder: [],
        folderloading: false,
        file: [],
        fileloading: false,
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
        error: {},
      };
    case LOADING:
        return {
          ...state,
          loading: true,
        };

    default:
      return state;
  }
}
