import {
  CREATE_FILESYSTEM,
  ERROR_CREATE_FILESYSTEM,
  CLEAR_FILESYSTEM,
  CHOOSE_FILESYSTEM,
} from '../actions/types';

const initialState = {
  filesystem: [],
  filesystemloading: false,
  error: {},
};

export default function filesystem(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHOOSE_FILESYSTEM:
    case CREATE_FILESYSTEM:
      return {
        ...state,
        filesystem: payload,
        filesystemloading: true,
      };
    case ERROR_CREATE_FILESYSTEM:
      return {
        filesystem: [],
        filesystemloading: false,
        error: {},
      };
    case CLEAR_FILESYSTEM:
      return {
        filesystem: [],
        filesystemloading: false,
        error: {},
      };
    default:
      return state;
  }
}
