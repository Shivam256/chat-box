import React from 'react';
import './room-info.styles.scss';

const RoomInfo = ({room}) => {
  return (
    <div className="room-info-card">
     <div className="room-info-heading">ABOUT {room.name}</div>
     
    </div>
  )
}

export default RoomInfo;