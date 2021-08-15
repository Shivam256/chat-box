import React,{useState,useEffect} from 'react';
import './message.styles.scss';

import {Avatar} from '@material-ui/core';

//utils
import {getUser} from '../../utils/user.firebase';


const Message = ({message}) => {
  const [user,setUser] = useState({});

  useEffect(()=>{
    getUser(message.author.id)
    .then(res => {
      setUser(res);
    })
  },[])


  return (
    <div className="message-body">
      <Avatar src={user.profilePic}/>
      <div className="message-info">
        <div className="username">{user.username}</div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  )
}

export default Message;