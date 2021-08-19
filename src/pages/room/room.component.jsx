import React,{useState,useEffect} from 'react';
import './room.styles.scss';
import {useParams} from 'react-router-dom';

//components
import Sidebar from '../../components/sidebar/sidebar.component';
import RoomContainer from '../../components/room-container/room-container.component';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//utils
import {getRoom} from '../../utils/room.firebase';

//redux
import {connect} from 'react-redux';
import {setCurrentRoom} from '../../redux/room/room.actions';




const Room = ({setCurrentRoom}) => {
  const {id} = useParams();
  // console.log(id);
  const [room,setRoom] = useState({});
  const [loading,setLoading] = useState(true);

  const setRoomsToEmpty = () =>{
    setRoom({});
    setCurrentRoom({});
  }

  useEffect(()=>{
    id?
    getRoom(id)
    .then(res => {
      // console.log(room);
      setRoom(res);
      // console.log(room);
      // setCurrentRoom(room);
      setLoading(false);
    })
    :setRoomsToEmpty()
  },[id])

  return(
    <div className="room">
      <Sidebar/>
      {
        id?(!loading?<RoomContainer room={room}/>:<div className="loader-container">	<Loader type="TailSpin" color="#7209B7" height={80} width={80} /></div>):null
      }
      
    </div>
  )
}

const mapDispacthToProps = dispatch => ({
  setCurrentRoom:room => dispatch(setCurrentRoom(room))
})

export default connect(null,mapDispacthToProps)(Room);