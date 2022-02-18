import * as actionTypes from './types';

export const addNotification = (payload) => {
    return {
        type: actionTypes.ADD_NOTIFICATION,
        data: {...payload}
    };
};

export const hideNotification = () => {
    return {
        type: actionTypes.HIDE_NOTIFICATION
    };
};

export const removeLastNotification = () => {
    return {
        type: actionTypes.REMOVE_NOTIFICATION
    };
};
