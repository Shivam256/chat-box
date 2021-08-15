import React,{useEffect} from 'react';
import './popup.styles.scss';


const Popup = ({children}) => {
  useEffect(()=>{
    
  },[])
  return(
    <div className="popup-container">
    {children}
    </div>
  )
}

export default Popup;