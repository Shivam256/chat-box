import React, { useState } from "react";
import "./user-preview.styles.scss";

import { Avatar } from "@material-ui/core";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

//redux
import {connect} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {createStructuredSelector} from 'reselect';

//utils
import {addFriend } from '../../utils/user.firebase';

const UserPreview = ({ user ,currentUser}) => {

  const handleMessage = async () =>{
    await addFriend(currentUser.uid,user.uid);
  }
  return (
    <div className="user-preview-container">
      <Popup
        trigger={(open) => (
          <div className="user-preview">
            <Avatar src={user.profilePic} />
            <div className="username-container">{user.username}</div>
          </div>
        )}
        position="left bottom"
        closeOnDocumentClick
        className="my-popup"
      >
        <div className="popup-body">
          <div className="popup-user-img"><Avatar src={user.profilePic} /></div>
          <p className="popup-user-name">{user.username}</p>
          {
            currentUser.uid !== user.uid?
            <div className="popup-user-msgbtn" onClick={handleMessage}>message</div>
            :
            <div className="popup-user-profile">profile</div>
          }
        </div>
      </Popup>
      
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

export default connect(mapStateToProps,null)(UserPreview);
