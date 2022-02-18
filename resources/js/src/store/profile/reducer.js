import {error, success} from 'redux-saga-requests';
import * as actionTypes from './types';
const initialState = {
  loading: false,
  error: null,
};
const reducer = (state = initialState, action) => {
  const {type, data} = action;
  switch (type) {
    case actionTypes.SAVE_AVATAR:
    case actionTypes.REMOVE_AVATAR:
    case success(actionTypes.SAVE_AVATAR):
    case success(actionTypes.REMOVE_AVATAR):
    case error(actionTypes.SAVE_AVATAR):
    case error(actionTypes.REMOVE_AVATAR):
    default:
      return state;
  }
};
export default reducer;
