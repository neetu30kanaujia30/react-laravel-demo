import {error, success} from 'redux-saga-requests';
import * as actionTypes from './types';

const initialState = {
    loading: false,
    error: false,
    allusers: [],
    whole_user: [],
    auth_user: [],

};
const reducer = (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        // Actions===============================================================
        case actionTypes.GET_USERS:
            return {...state, loading: true, error: null};
        //
        // Success===============================================================
        //
             case success(actionTypes.GET_USERS):
            return {...state, loading: false, allusers: data.allusers, whole_user: data.whole_user, auth_user: data.auth_user, error: null};
        //
        // Errors===============================================================
        //

        case error(actionTypes.GET_USERS):
        default:
            return state;
    }
};
export default reducer;
