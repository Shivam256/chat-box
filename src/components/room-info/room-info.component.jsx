import React,{useState,useEffect} from 'react';
import './room-info.styles.scss';

//components
import UserPreview from '../user-preview/user-preview.component';

//utis
import {getUser} from '../../utils/user.firebase';
import {getRoomMembers} from '../../utils/room.firebase';



const RoomInfo = ({room}) => {
  const [creator,setCreator] = useState({});
  const [members,setRoomMembers] = useState([]);

  useEffect(()=>{
    
    getUser(room.creator.id)
    .then(res =>{
      // console.log(res);
      setCreator(res);
    })

    getRoomMembers(room.uid)
    .then(res =>{
      Promise.all(res).then(result =>{
        setRoomMembers(result);
      })
    })
    
    // console.log(room);
   
    
  },[room])
  return (
    <div className="room-info-card">
     <div className="room-info-heading">{room.name}</div>
     <div className="room-pic" style={{backgroundImage:`url(${room.imageURL})`}}></div>
     <div className="room-description">{room.description}</div>
     <div className="room-author">CREATOR: <br /> <UserPreview user={creator}/> </div>
     <div className="room-members-header">MEMBERS: <br /> </div>
     <div className="room-members">
     {
       members.map(member => <UserPreview user={member} key={member.uid}/>)
     }
     </div>
    </div>
  )
}

export default RoomInfo;