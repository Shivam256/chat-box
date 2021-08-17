import {createSelector} from 'reselect';

const selectRoom = state => state.room;

export const selectCurrentRoom = createSelector(
  [selectRoom],
  room => room.currentRoom
)

export const selectCreateRoomHidden = createSelector(
  [selectRoom],
  room => room.createRoomHidden
)

export const selectJoinRoomHidden = createSelector(
  [selectRoom],
  room => room.joinRoomHidden
)