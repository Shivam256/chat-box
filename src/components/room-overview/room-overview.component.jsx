import React,{useEffect,useState} from 'react';
import './room-overview.styles.scss';

import PersonIcon from '@material-ui/icons/Person';
import {Avatar} from '@material-ui/core';

//redux
import {selectCurrentUser} from '../../redux/user/user.selector';
import {connect} from 'react-redux'; 
import {createStructuredSelector} from 'reselect';

const RoomOverview = ({room,currentUser}) => {
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
  return (
    <div className="room-overview-container">
      <div className="room-name"><Avatar src={room.imageURL} /> {room.name}</div>
      <div className="room-members">{room.members.length} <PersonIcon/></div>
      {
        !isJoined?
        <div className="room-join-btn">JOIN</div>
        :
        <div className="room-joined-btn">JOINED</div>

      }
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

export default connect(mapStateToProps,null)(RoomOverview);