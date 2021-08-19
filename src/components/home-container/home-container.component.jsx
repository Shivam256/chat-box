import React, { useState, useEffect } from "react";
import "./home-container.styles.scss";

//components
import Header from "../header/header.component";
import ChatBox from "../chat-box/chat-box.component";
import CustomInput from "../custom-input/custom-input.component";

//utils
import {
  getChatMessageId,
  sendMessageToFriend,
} from "../../utils/user.firebase";
import { filterId } from "../../utils/room.firebase";
import { firestore } from "../../firebase/firebase.utils";

//redux
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

const HomeContainer = ({ friend, currentUser }) => {
  const [msgCollectionId, setMsgCollectionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getChatMessageId(currentUser.uid, friend.uid)
      .then((res) => {
        // console.log(res);
        setMsgCollectionId(res);
        return res;
      })
      .then((id) => {
        const url = `/messages/${filterId(id)}`;
        // console.log(url);
        firestore
          .doc(url)
          .collection("chat")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            // console.log(snapshot);
            setMessages(snapshot.docs.map((doc) => doc.data()));
          });
      });
  }, [friend, currentUser]);

  const handleChange = async (e) => {
    setMessage(e.target.value);
    // console.log(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessageToFriend(
      currentUser.uid,
      friend.uid,
      msgCollectionId,
      message
    );
    setMessage("");
  };

  return (
    <div className="home-container">
      <div className="user-chat-section">
        <Header text={friend.username} />
        <ChatBox messages={messages} />
        <form onSubmit={handleSubmit}>
          <CustomInput onChange={handleChange} value={message} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(HomeContainer);
