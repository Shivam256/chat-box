import React,{useEffect} from 'react';
import './popup.styles.scss';

//material ui
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from '@material-ui/core';

//redux
import {closeAllRoomPopup} from '../../redux/room/room.actions';
import {connect} from 'react-redux';


const Popup = ({children,closeAllRoomPopup}) => {
  return(
    <div className="popup-container">
      <div className="close-popup-btn" onClick={closeAllRoomPopup}><CloseIcon/></div>
    {children}
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  closeAllRoomPopup:()=>dispatch(closeAllRoomPopup())
})
export default connect(null,mapDispatchToProps)(Popup);