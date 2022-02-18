import Cookies from 'js-cookie';
import {error, success} from 'redux-saga-requests';
import * as actionTypes from './types';
const initialState = {
    loggedIn: false,
    loggedOut: false,
    user: null,
    loading: false,
    error: null
};
const reducer = (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        case actionTypes.LOGIN:
        case actionTypes.LOGOUT:
        case success(actionTypes.LOGIN):
        case success(actionTypes.LOGOUT): {
            Cookies.remove('token');
            Cookies.remove('expires_at');
            return {
                ...state,
                user: null,
                loading: false,
                loggedIn: false,
                loggedOut: true
            };
        }
        case error(actionTypes.LOGOUT):
        case error(actionTypes.LOGIN):
        default:
            return state;
    }
};
export default reducer;