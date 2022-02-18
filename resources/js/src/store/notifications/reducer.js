import {error, success} from 'redux-saga-requests';

import * as actionTypes from './types';

const initialState = {
    list: [],
    loading: false,
    error: null,
    total: 0,
};

const reducer = (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        case actionTypes.GET:
        case actionTypes.MARK_AS_READ:
            return {...state, loading: true, error: null};

        case success(actionTypes.GET):
            return {...state, list: data.notifications, total: data.total, loading: false, error: null};

        case success(actionTypes.MARK_AS_READ):
            return {...state, loading: false, error: null};

        case error(actionTypes.GET):
        case error(actionTypes.MARK_AS_READ):
            return {...state, loading: false, error: action.error};

        default:
            return state;
    }
};

export default reducer;
