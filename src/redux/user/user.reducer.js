import UserActionTypes  from "./user.types";

const INITIAL_STATE = {
  currentUser:null,
  findUserHidden:true,
  settingsHidden:true,
}


const userReducer = (state=INITIAL_STATE,action) => {
  switch(action.type){
    case UserActionTypes.SET_CURRENT_USER:
      return({
        ...state,
        currentUser:action.payload
      })
    case UserActionTypes.TOGGLE_FIND_USER_HIDDEN:
      return{
        ...state,
        findUserHidden:!state.findUserHidden
      }  
    case UserActionTypes.TOGGLE_SETTINGS_HIDDEN:
      return{
        ...state,
        settingsHidden:!state.settingsHidden
      }  
    case UserActionTypes.CLOSE_ALL_USER_POPUP:
      return{
        ...state,
        settingsHidden:true,
        findUserHidden:true
      }  
    default:
      return state

  }
}


export default userReducer;