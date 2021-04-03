import {
  GET_DRIVES,
  SEARCH_DRIVES_SUCCESS,
  SEARCH_DRIVE_ERROR,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  DRIVE_ERROR,
  CHOOSE_DRIVE,
  CLEAR_DRIVES_STATE,
} from '../actions/types';

const initialState = {
  drives: [],
  drivestype: null,
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
        drives: payload.drives,
        drivestype: payload.drivestype,
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
        drivestype: null,
        drivesloading: false,
        searchinput: '',
        drive: {},
        driveloading: false,
        error: payload,
      };
    case CLEAR_DRIVES:
      return {
        ...state,
        drives: [],
        drivesloading: false,
        searchinput: '',
      };
    case CLEAR_DRIVES_STATE:
      return {
        drives: [],
        drivestype: null,
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
