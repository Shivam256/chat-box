import UserActionTypes from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload:user
});

export const toggleSettingsHidden = () => ({
  type:UserActionTypes.TOGGLE_SETTINGS_HIDDEN
})

export const toggleFindUserHidden = () =>({
  type:UserActionTypes.TOGGLE_FIND_USER_HIDDEN
})

export const closeAllUserPopup = () => ({
  type:UserActionTypes.CLOSE_ALL_USER_POPUP
})