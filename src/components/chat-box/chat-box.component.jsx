import React,{useState,useEffect,useRef} from 'react';
import './chat-box.styles.scss'


import Message from '../message/message.component';

const ChatBox = ({messages}) => {
  const messegesEndRef = useRef(null)
  useEffect(()=>{
    messegesEndRef.current.scrollIntoView({behavior:"smooth"})
    
  },[messages])
  return(
    <div className="chat-box">
    {messages.length>0?messages.map(message => <Message message={message}/>):""}
    <div ref={messegesEndRef}></div>
    </div>
  )
}

export default ChatBox;