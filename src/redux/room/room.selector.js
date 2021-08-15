import {createSelector} from 'reselect';

const selectRoom = state => state.room;

export const selectCurrentRoom = createSelector(
  [selectRoom],
  room => room.currentRoom
)