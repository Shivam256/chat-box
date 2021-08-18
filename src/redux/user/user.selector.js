import {createSelector} from 'reselect';

const selectUser = state => state.user;


export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)

export const selectFindUserHidden = createSelector(
  [selectUser],
  user => user.findUserHidden
)

export const selectSettingsHidden = createSelector(
  [selectUser],
  user => user.settingsHidden
)

