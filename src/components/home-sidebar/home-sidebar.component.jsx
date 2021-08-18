import React,{useState,useEffect} from 'react';
import './home-sidebar.styles.scss';

//utils
import {getUserFriends} from '../../utils/user.firebase';

//components
import SidebarKey from '../sidebar-key/sidebar-key.component';
import IconButton from '../icon-button/icon-button.component';

//redux
import {connect} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {createStructuredSelector} from 'reselect';


const HomeSidebar = ({currentUser}) => {
  const [friends,setFriends] = useState([]);

  useEffect(()=>{
    	getUserFriends(currentUser.uid)
      .then(res =>{
        Promise.all(res).then(result =>{
          setFriends(result)
        })
      })
  },[currentUser])
  return(
    <div className="home-sidebar">
      <div className="home-btn">HOME</div>
      <div className="sidebar-key-container">
      {
        friends.map(friend => <SidebarKey imageUrl={friend.profilePic} name={friend.username} pathName={`/home/${friend.uid}`}/>)
      }
      </div>
      <IconButton iconName="explore" text="FIND FRIENDS"/>
      <IconButton iconName="settings" text="SETTINGS"/>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

export default connect(mapStateToProps,null)(HomeSidebar);