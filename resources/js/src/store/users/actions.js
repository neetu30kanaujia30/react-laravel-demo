import * as actionTypes from './types';const baseUrl = '/api';



export const getUsers = (params) => ({
    type: actionTypes.GET_USERS,
    request: {
        method: 'GET',
        url: `${baseUrl}/get-users`,
        params
    }
});
