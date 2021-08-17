import RoomActionTypes from "./room.types";

export const setCurrentRoom = (room) => ({
  type:RoomActionTypes.SET_CURRENT_ROOM,
  payload:room
})

export const toggleCreateRoomHidden = () => ({
  type:RoomActionTypes.TOGGLE_CREATE_ROOM_HIDDEN
})

export const toggleJoinRoomHidden = () => ({
  type:RoomActionTypes.TOGGLE_JOIN_ROOM_HIDDEN
})

export const closeAllRoomPopup = () => ({
  type:RoomActionTypes.CLOSE_ALL_ROOM_POPUP
})