import {combineReducers} from 'redux';

//reducers
import userReducer from './user/user.reducer';
import roomReducer from './room/room.reducer';


const rootReducer = combineReducers({
  user:userReducer,
  room:roomReducer
})

export default rootReducer;