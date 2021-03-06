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
export const removeAvatar = (data) => ({
  type: actionTypes.REMOVE_AVATAR,
  request: {
    method: 'DELETE',
    url: `${baseUrl}/remove-avatar`,
      data
  }
});
export const editProfile = (data) => ({
    type: actionTypes.EDIT_PROFILE,
    request: {
        method: 'PUT',
        url: `${baseUrl}/edit-profile`,
        data
    }
});
