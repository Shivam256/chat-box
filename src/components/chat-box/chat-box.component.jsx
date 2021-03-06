import React,{useState,useEffect,useRef} from 'react';
import './chat-box.styles.scss'


import Message from '../message/message.component';

const ChatBox = ({messages}) => {
  const messegesEndRef = useRef(null)
  useEffect(()=>{
    messegesEndRef.current.scrollIntoView({behavior:"smooth"})
    // console.log(messages);
  },[messages])
  return(
    <div className="chat-box">
      {messages.length>0?messages.map(message => <Message message={message} key={message.timestamp} />):""}
      <div ref={messegesEndRef}></div>
    </div>
  )
}

export default ChatBox;