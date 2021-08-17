import React, { useState, useEffect } from "react";
import "./sidebar.styles.scss";

//components
import SidebarKey from "../sidebar-key/sidebar-key.component";
import IconButton from "../icon-button/icon-button.component";
import Popup from "../popup/popup.component";
import FormInput from "../form-input/form-input.component";
import RoomOverview from "../room-overview/room-overview.component";

//utils
import { getUserRooms } from "../../utils/user.firebase";
import { getRoom,createNewRoom ,getAllRooms} from "../../utils/room.firebase";
import { useLocation } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentRoom,
  selectJoinRoomHidden,
  selectCreateRoomHidden,
} from "../../redux/room/room.selector";
import {
  toggleCreateRoomHidden,
  toggleJoinRoomHidden,
} from "../../redux/room/room.actions";

const Sidebar = ({
  currentUser,
  currentRoom,
  createRoomHidden,
  joinRoomHidden,
  toggleCreateRoomHidden,
  toggleJoinRoomHidden
}) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    roomDes: "",
    roomImgURL: "",
  });
  const [allRooms,setAllRooms] = useState([]);

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

    getAllRooms()
    .then(res =>{
      Promise.all(res).then(result =>{
        console.log(result);
        setAllRooms(result);
      })
    })
    //console.log(rooms[0]);
  }, [currentUser, currentRoom]);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    // console.log(roomInfo);
    const {roomName,roomDes,roomImgURL} = roomInfo;
    await createNewRoom(roomName,roomDes,roomImgURL,currentUser.uid)
    
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setRoomInfo({ ...roomInfo, [name]: value });
  };

  return (
    <div className="sidebar">
      <div className="home-btn">HOME</div>
      <div className="sidebar-key-container">
        {rooms.map((room) => (
          <SidebarKey
            name={room.name}
            imageUrl={room.imageURL?room.imageURL:"https://i.pinimg.com/736x/80/3d/9d/803d9df3f128eed08db2a58f6b6d6659.jpg"}
            pathName={`/rooms/${room.uid}`}
            key={room.uid}
          />
        ))}
      </div>
      ;
      <IconButton
        iconName="add"
        text="CREATE A ROOM"
        onClick={toggleCreateRoomHidden}
      />
      {!createRoomHidden ? (
        <Popup>
          <div className="create-room-container">
            <h1>CREATE A ROOM</h1>
            <form onSubmit={handleCreateRoom}>
              <FormInput
                label="ROOM NAME:"
                isTextArea={false}
                onChange={handleChange}
                name="roomName"
                value={roomInfo.roomName}
              />
              <FormInput
                label="ROOM DESCRIPTION:"
                isTextArea={true}
                name="roomDes"
                onChange={handleChange}
                value={roomInfo.roomDes}
              />
              <FormInput
                label="ROOM IMAGE LINK:"
                name="roomImgURL"
                onChange={handleChange}
                value={roomInfo.roomImgURL}
              />
              <button type="submit" className="create-room-btn" onClick={toggleCreateRoomHidden}>
                CREATE
              </button>
            </form>
          </div>
        </Popup>
      ) : null}
      <IconButton iconName="explore" text="JOIN A ROOM" onClick={toggleJoinRoomHidden}/>
      {
        !joinRoomHidden?
        <Popup>
          <div className="join-room-container">
            <h1>EXPLORE ROOMS</h1>
            <div className="search-bar-container">
              <input type="text" />
              <button>SEARCH</button>
            </div>
            <div className="room-preview-container">
              {
                allRooms.map(room => <RoomOverview room={room} key={room.uid}/>)
              }
            </div>
          </div>
        </Popup>
        :null
      }
    </div>
  );
};

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom,
  createRoomHidden: selectCreateRoomHidden,
  joinRoomHidden: selectJoinRoomHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCreateRoomHidden: () => dispatch(toggleCreateRoomHidden()),
  toggleJoinRoomHidden: () => dispatch(toggleJoinRoomHidden()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Sidebar);
