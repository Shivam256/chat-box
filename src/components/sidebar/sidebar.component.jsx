import React, { useState, useEffect } from "react";
import "./sidebar.styles.scss";

//components
import SidebarKey from "../sidebar-key/sidebar-key.component";
import IconButton from "../icon-button/icon-button.component";
import Popup from '../popup/popup.component';

//utils
import { getUserRooms } from "../../utils/user.firebase";
import { getRoom } from "../../utils/room.firebase";
import { useLocation } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { selectCurrentRoom } from "../../redux/room/room.selector";



const Sidebar = ({ currentUser, currentRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  // let location = useLocation();

  useEffect(() => {
    // console.log(currentUser.uid);
    // console.log(location);
    currentRoom ? setSelectedRoom(currentRoom) : setSelectedRoom(null);

    getUserRooms(currentUser.uid).then((res) => {
      Promise.all(res).then((result) => {
        // console.log(result);
        setRooms(result);
      });
    });
    //console.log(rooms[0]);
  }, [currentUser, currentRoom]);

  return (
    <div className="sidebar">
      <div className="home-btn">HOME</div>
      <div className="sidebar-key-container">
        {rooms.map((room) => (
          <SidebarKey
            name={room.name}
            imageUrl="https://i.pinimg.com/736x/80/3d/9d/803d9df3f128eed08db2a58f6b6d6659.jpg"
            pathName={`/rooms/${room.uid}`}
            key={room.uid}
          />
        ))}
      </div>
      
      ;
      <IconButton iconName="add" text="CREATE A ROOM" />
      <Popup>
        <div className="create-room-container">
          <h1>CREATE A ROOM</h1>
        </div>
      </Popup>
      <IconButton iconName="explore" text="JOIN A ROOM" />
      
    </div>
  );
};

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
});

export default connect(mapStatetoProps, null)(Sidebar);
