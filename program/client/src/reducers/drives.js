import {
  GET_DRIVES,
  SEARCH_DRIVES_SUCCESS,
  SEARCH_DRIVE_ERROR,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  DRIVE_ERROR,
  CHOOSE_DRIVE,
  JOIN_DRIVE,
} from '../actions/types';

const initialState = {
  drives: [],
  drivesloading: false,
  searchinput: '',
  drive: {},
  driveloading: false,
  error: {},
};

export default function drives(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_DRIVES_SUCCESS:
      return {
        ...state,
        drives: payload.drives,
        drivesloading: true,
        searchinput: payload.searchinput,
      };
    case GET_DRIVES:
      return {
        ...state,
        drives: payload,
        drivesloading: true,
        drive: {},
        driveloading: false,
      };
    case CHOOSE_DRIVE:
      return {
        ...state,
        drive: payload,
        driveloading: true,
      };
    case CREATE_DRIVE_ERROR:
    case DRIVE_ERROR:
    case SEARCH_DRIVE_ERROR:
      return {
        drives: [],
        drivesloading: false,
        searchinput: '',
        drive: {},
        driveloading: false,
        error: payload,
      };
    case CLEAR_DRIVES:
      return {
        drives: [],
        drivesloading: false,
        searchinput: '',
        drive: {},
        driveloading: false,
        error: {},
      };
    default:
      return state;
  }
}
