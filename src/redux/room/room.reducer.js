import RoomActionTypes from './room.types';

const INITIAL_STATE = {
  currentRoom:null,
  createRoomHidden:true,
  joinRoomHidden:true,  
}  

const roomReducer = (state=INITIAL_STATE,action) => {
  switch(action.type){
    case RoomActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom:action.payload
      }
    case RoomActionTypes.TOGGLE_CREATE_ROOM_HIDDEN:
      return{
        ...state,
        createRoomHidden:!state.createRoomHidden
      }
    case RoomActionTypes.TOGGLE_JOIN_ROOM_HIDDEN:
      return {
        ...state,
        joinRoomHidden:!state.joinRoomHidden
      }    
    case RoomActionTypes.CLOSE_ALL_ROOM_POPUP:
      return{
        ...state,
        createRoomHidden:true,
        joinRoomHidden:true
      }  
    default:
      return state;
  }
}

export default roomReducer;