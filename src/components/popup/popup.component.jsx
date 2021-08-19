import React,{useEffect} from 'react';
import './popup.styles.scss';

//material ui
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';

//redux
import {closeAllRoomPopup} from '../../redux/room/room.actions';
import {closeAllUserPopup} from '../../redux/user/user.actions';
import {connect} from 'react-redux';



const Popup = ({children,closeAllRoomPopup,closeAllUserPopup}) => {
  const closeAllPopups = () =>{
    closeAllRoomPopup();
    closeAllUserPopup()
  }
  return(
    <div className="popup-container">
      <div className="close-popup-btn" onClick={closeAllPopups}><CloseIcon/></div>
    {children}
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  closeAllRoomPopup:()=>dispatch(closeAllRoomPopup()),
  closeAllUserPopup:()=>dispatch(closeAllUserPopup())
})
export default connect(null,mapDispatchToProps)(Popup);