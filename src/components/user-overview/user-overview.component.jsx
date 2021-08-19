import React from 'react';
import './user-oveview.styles.scss';

//libs
import {Avatar} from '@material-ui/core';
import {Redirect,useHistory} from 'react-router-dom';

//utils
import {addFriend} from '../../utils/user.firebase';

const UserOverview = ({user,currentUser}) =>{
  let history = useHistory();
  const handleAddFriend = async () =>{
    await addFriend(currentUser.uid,user.uid);
    history.push(`/home/${user.uid}`);
  }
  return (
    <div className="user-overview">
      <div className="user-name"><Avatar src={user.profilePic}/> {user.username}</div>
      <div className="user-msg-btn" onClick={handleAddFriend}>message</div>
    </div>
  )
}


export default UserOverview;