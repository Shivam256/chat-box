import React,{useEffect,useState} from 'react';
import './room-overview.styles.scss';

import PersonIcon from '@material-ui/icons/Person';
import {Avatar} from '@material-ui/core';

//redux
import {selectCurrentUser} from '../../redux/user/user.selector';
import {connect} from 'react-redux'; 
import {createStructuredSelector} from 'reselect';
import {setCurrentUser} from '../../redux/user/user.actions';

//utils
import {joinRoom,getUser,leaveRoom} from '../../utils/user.firebase';
import { current } from 'immer';

const RoomOverview = ({room,currentUser,setCurrentUser}) => {
  const [isJoined,setIsJoined] = useState(false);
  useEffect(()=>{
    const userId = currentUser.uid;
    console.log(userId);
    room.members.forEach(member => {
      if(member.id === userId){
        console.log("same user!");
        setIsJoined(true);
      }
    })
  },[room,currentUser])

  const handleJoinRoom = async () =>{
    await joinRoom(currentUser.uid,room.uid);
    getUser(currentUser.uid)
    .then(res =>{
      setCurrentUser(res);
    })

  }

  const handleRoomLeave = async ()=>{
    await leaveRoom(currentUser.uid,room.uid);
    getUser(currentUser.uid)
    .then(res =>{
      setCurrentUser(res);
    })

  }
  return (
    <div className="room-overview-container">
      <div className="room-name"><Avatar src={room.imageURL} /> {room.name}</div>
      <div className="room-members">{room.members.length} <PersonIcon/></div>
      {
        !isJoined?
        <div className="room-join-btn" onClick={handleJoinRoom}>JOIN</div>
        :
        <div className="room-joined-btn" onClick={handleRoomLeave}>JOINED</div>

      }
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})
const mapDispatchToProps = dispatch =>({
  setCurrentUser:user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(RoomOverview);