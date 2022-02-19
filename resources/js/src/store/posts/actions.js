import * as actionTypes from './types';const baseUrl = '/api';



export const getPosts = (params) => ({
    type: actionTypes.GET_POSTS,
    request: {
        method: 'GET',
        url: `${baseUrl}/get-posts`,
        params
    }
});
export const likePost = (params) => ({
    type: actionTypes.LIKE_POST,
    request: {
        method: 'POST',
        url: `${baseUrl}/like-post`,
        params
    }
});
