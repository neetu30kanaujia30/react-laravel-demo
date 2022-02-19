 import Cookies from 'js-cookie';
import {error, success} from 'redux-saga-requests';
import * as actionTypes from './types';
const initialState = {
    loading: false,
    error: false,
    user: null,
    loggedIn: false,
};
const reducer = (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        // Actions===============================================================
        case actionTypes.LOGIN :
        case actionTypes.LOGOUT :
        case actionTypes.CHECK:
        // Success===============================================================
        case success(actionTypes.LOGIN):
        case success(actionTypes.LOGOUT): {
            Cookies.remove('token');
            Cookies.remove('expires_at');
            Cookies.remove('auth_user_id');
            return {
                ...state,
                user: null,
                loading: false,
                loggedIn: false,
                loggedOut: true
            };
        }
        case success(actionTypes.CHECK):

        case actionTypes.WITHOUT_TOKEN:
            return {...state, loading: false, user: null, loggedIn: false};


        // Errors===============================================================
        case error(actionTypes.LOGIN):
        case error(actionTypes.LOGOUT):

        case error(actionTypes.CHECK):
        default:
            return state;
    }
};
export default reducer;
