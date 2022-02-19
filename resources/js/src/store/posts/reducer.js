import {error, success} from 'redux-saga-requests';
import * as actionTypes from './types';

const initialState = {
    loading: false,
    error: false,
    allposts: [],


};
const reducer = (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        // Actions===============================================================
        case actionTypes.GET_POSTS:
            return {...state, loading: true, error: null};
        //
        // Success===============================================================
        //
             case success(actionTypes.GET_POSTS):
            return {...state, loading: false, allposts: data.allposts, error: null};
        //
        // Errors===============================================================
        //

        case error(actionTypes.GET_POSTS):
        default:
            return state;
    }
};
export default reducer;
