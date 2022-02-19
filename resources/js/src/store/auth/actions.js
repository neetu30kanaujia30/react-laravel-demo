import * as actionTypes from './types';const baseUrl = '/api/auth';
export const login = ({email, password}) => ({
    type: actionTypes.LOGIN,
    request: {
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email, password
        }
    },
    meta: {
        withoutToken: true
    }
});

export const register = (data) => ({
    type: actionTypes.REGISTER,
    request: {
        method: 'POST',
        url: `${baseUrl}/signup`,
        data
    },
    meta: {
        withoutToken: true
    }
});
export const logout = () => ({
    type: actionTypes.LOGOUT,
    request: {
        method: 'DELETE',
        url: `${baseUrl}/logout`
    }
});
export const refreshUser = (userObj) => ({
    type: actionTypes.REFRESH,
    data: {
        user: userObj
    }
});
export const checkSession = () => ({
    type: actionTypes.CHECK,
    request: {
        method: 'GET',
        url: `${baseUrl}/me`
    }
});
export const withoutToken = () => ({
    type: actionTypes.WITHOUT_TOKEN
});
