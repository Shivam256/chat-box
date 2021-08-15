import React,{useState,useEffect} from 'react';
import './room.styles.scss';
import {useParams} from 'react-router-dom';

//components
import Sidebar from '../../components/sidebar/sidebar.component';
import RoomContainer from '../../components/room-container/room-container.component';

//utils
import {getRoom} from '../../utils/room.firebase';

//redux
import {connect} from 'react-redux';
import {setCurrentRoom} from '../../redux/room/room.actions';


const Room = ({setCurrentRoom}) => {
  const {id} = useParams();
  console.log(id);
  const [room,setRoom] = useState({});
  useEffect(()=>{
    id?
    getRoom(id)
    .then(res => {
      console.log(room);
      setRoom(res);
      // console.log(room);
      setCurrentRoom(room);
    })
    :setRoom({})
  },[id])

  return(
    <div className="room">
      <Sidebar/>
      {
        id?<RoomContainer room={room}/>:null
      }
    </div>
  )
}

const mapDispacthToProps = dispatch => ({
  setCurrentRoom:room => dispatch(setCurrentRoom(room))
})

export default connect(null,mapDispacthToProps)(Room);