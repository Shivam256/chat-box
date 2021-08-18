import React,{useState,useEffect} from 'react';
import './custom-input.styles.scss';

//icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core'

//utils


//redux


const CustomInput = ({...props}) => {
  return(
    <div className="custom-input">
      <IconButton><AddCircleOutlineIcon/></IconButton>
      <input type="text" className="message-input" {...props} />
      <button type="submit" className="send-msg-btn"><IconButton><SendIcon/></IconButton></button>
      <IconButton><InsertEmoticonIcon/></IconButton>
    </div>
  )
}



export default CustomInput;