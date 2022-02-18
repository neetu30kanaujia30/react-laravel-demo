import * as actionTypes from './types';
const baseUrl = '/api/profile';
export const saveAvatar = (data) => ({
  type: actionTypes.SAVE_AVATAR,
  request: {
    method: 'POST',
    url: `${baseUrl}/save-avatar`,
    data
  }
});
export const removeAvatar = () => ({
  type: actionTypes.REMOVE_AVATAR,
  request: {
    method: 'DELETE',
    url: `${baseUrl}/remove-avatar`
  }
});
