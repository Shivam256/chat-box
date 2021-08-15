import React,{useState,useEffect} from 'react';
import './custom-input.styles.scss';

//icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core'

//utils
import {sendMessageToRoom} from '../../utils/room.firebase';

//redux
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selectCurrentRoom} from '../../redux/room/room.selector';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const CustomInput = ({currentUser,currentRoom}) => {
  const [message,setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(currentRoom.uid);
    await sendMessageToRoom(currentRoom.uid,message,currentUser.uid);
    console.log(message);
    setMessage("");
  }
  return(
    <div className="custom-input">
      <IconButton><AddCircleOutlineIcon/></IconButton>
      <form onSubmit={handleSubmit}>
        <input type="text" className="message-input" onChange={handleChange} value={message}/>
        <button type="submit"><IconButton><SendIcon/></IconButton></button>
      </form>
      <IconButton><InsertEmoticonIcon/></IconButton>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  currentRoom:selectCurrentRoom
})

export default connect(mapStateToProps,null)(CustomInput);