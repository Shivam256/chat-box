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
import { getRoomMessages,deleteMessagesFromRoom,sendMessageToRoom,filterId} from "../../utils/room.firebase";

//redux
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selectCurrentRoom} from '../../redux/room/room.selector';
import {setCurrentRoom} from '../../redux/room/room.actions';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const RoomContainer = ({ room,currentUser,setCurrentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [message,setMessage] = useState("");

  useEffect(() => {
    // getRoomMessages()
    // .then(res => {
    //   console.log(res);
    // })
    // console.log(`/wekfjwe/${currentUser.uid}`);
    let url = `/rooms/${String(room.uid)}`;
    
    if(String(room.uid)[0] === ' '){
      url = `/rooms/${String(room.uid).slice(1)}`;
    }
    
    setCurrentRoom(room);
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

  const handleChange = (e) => {
    setMessage(e.target.value);
    // console.log(e.target.value);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    await sendMessageToRoom(filterId(room.uid),message,currentUser.uid);
    // console.log(message);
    setMessage("");
  }
 
  return (
    <div className="room-container">
      <div className="room-chat-section">
        <Header text={room.name} />
        <ChatBox messages={messages}/>
        <form onSubmit={handleSubmit}>
          <CustomInput onChange={handleChange} value={message}/>
        </form>
      </div>
      <div className="room-info-section">
        <RoomInfo room={room} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
})
const mapDispatchToProps = dispatch =>({
  setCurrentRoom:room=>dispatch(setCurrentRoom(room))
})

export default connect(mapStateToProps,mapDispatchToProps)(RoomContainer);
