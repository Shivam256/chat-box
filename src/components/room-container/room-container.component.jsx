import React, { useState, useEffect } from "react";
import "./room-container.styles.scss";

//compoennts
import Header from "../header/header.component";
import ChatBox from "../chat-box/chat-box.component";
import CustomInput from "../custom-input/custom-input.component";
import RoomInfo from "../room-info/room-info.component";

//utils
// import {getRoom,getRoomMessages} from '../../utils/room.firebase';
import { firestore } from "../../firebase/firebase.utils";
import { getRoomMessages,deleteMessagesFromRoom} from "../../utils/room.firebase";

const RoomContainer = ({ room }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // getRoomMessages()
    // .then(res => {
    //   console.log(res);
    // })
    let url = `/rooms/${String(room.uid)}`;
    if(String(room.uid)[0] === ' '){
      url = `/rooms/${String(room.uid).slice(1)}`;
    }
    firestore
      .doc(url)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot);
        setMessages(snapshot.docs.map((doc) => doc.data()));
        // console.log(messages);  
      });
      
  }, [room]);

 
 
  return (
    <div className="room-container">
      <div className="room-chat-section">
        <Header text={room.name} />
        <ChatBox messages={messages}/>
       
        <CustomInput />
      </div>
      <div className="room-info-section">
        <RoomInfo room={room} />
      </div>
    </div>
  );
};

export default RoomContainer;
