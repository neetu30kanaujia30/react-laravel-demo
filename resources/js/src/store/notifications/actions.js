import * as actionTypes from './types';

const baseUrl = '/api';
export const getNotifications = (params) => ({
    type: actionTypes.GET,
    request: {
        method: 'GET',
        url: `${baseUrl}/notifications`,
        params
    }
});
export const markAsRead = (data) => ({
    type: actionTypes.MARK_AS_READ,
    request: {
        method: 'PATCH',
        url: `${baseUrl}/notifications-mark-as-read`,
        data
    }
});