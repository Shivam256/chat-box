import React, { useState, useEffect } from "react";
import "./home-sidebar.styles.scss";

//utils
import { getUserFriends ,updateUserCredentials,getAllUsers} from "../../utils/user.firebase";

//components
import SidebarKey from "../sidebar-key/sidebar-key.component";
import IconButton from "../icon-button/icon-button.component";
import Popup from "../popup/popup.component";
import FormInput from "../form-input/form-input.component";
import UserOverview from '../user-overview/user-overview.component';

//redux
import { connect } from "react-redux";
import {
  selectCurrentUser,
  selectFindUserHidden,
  selectSettingsHidden,
} from "../../redux/user/user.selector";
import {
  toggleFindUserHidden,
  toggleSettingsHidden,
} from "../../redux/user/user.actions";
import { createStructuredSelector } from "reselect";

//libs
import Switch from "@material-ui/core/Switch";
import {Link} from 'react-router-dom';

const HomeSidebar = ({
  currentUser,
  toggleFindUserHidden,
  toggleSettingsHidden,
  findUserHidden,
  settingsHidden,
}) => {
  const [friends, setFriends] = useState([]);
  const [userInfo,setuserInfo] = useState({
    username:currentUser.username,
    profilePic:currentUser.profilePic,
    darkMode:false
  })
  const [isDarkMode,setDarkMode] = useState(false);
  const [users,setUsers] = useState([]);

  useEffect(() => {
    // console.log(currentUser);
    getUserFriends(currentUser.uid).then((res) => {
      Promise.all(res).then((result) => {
        setFriends(result);
      });
    });

    getAllUsers(currentUser.uid)
    .then(res => {
      setUsers(res);
    })
  }, [currentUser]);

  const handleChange = (e) =>{
    // console.log(e.target.name,e.target.value);
    setuserInfo({...userInfo,[e.target.name]:e.target.value})
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    const {username,profilePic} = userInfo;
    await updateUserCredentials(currentUser.uid,username,profilePic);
    toggleSettingsHidden();

  }
  const handleSwitchChange = e => {
    setDarkMode(e.target.checked);
    // console.log(e.target.name,e.target.checked)
  }
  return (
    <div className="home-sidebar">
      <div className="home-btn">HOME</div> 
      <Link to="/rooms"><div className="room-btn">ROOMS</div></Link>
      <div className="sidebar-key-container">
        {friends.map((friend) => (
          <SidebarKey
            imageUrl={friend.profilePic}
            name={friend.username}
            pathName={`/home/${friend.uid}`}
            key={friend.uid}
          />
        ))}
      </div>
      <IconButton
        iconName="explore"
        text="FIND PEOPLE"
        onClick={toggleFindUserHidden}
      />
      {!findUserHidden ? (
        <Popup>
          <div className="find-user-container">
            <h1>CONNECT WITH PEOPLE</h1>
            <div className="search-bar-container">
              <input type="text" />
              <button>SEARCH</button>
            </div>
            <div className="user-overview-container">
              {
                users.map(user => <UserOverview user={user} currentUser={currentUser} key={user.uid}/>)
              }
            </div>
          </div>
        </Popup>
      ) : null}

      <IconButton
        iconName="settings"
        text="SETTINGS"
        onClick={toggleSettingsHidden}
      />
      {!settingsHidden ? (
        <Popup>
          <div className="settings-container">
            <h1>SETTINGS</h1>
            <form onSubmit={handleSubmit}>
              <FormInput label="CHANGE USERNAME:" name="username" onChange={handleChange} value={userInfo.username}/>
              <FormInput label="CHANGE PROFILE PIC:" name="profilePic" onChange={handleChange} value={userInfo.profilePic}/>
              <div className="dark-mode-container">
                DARK MODE:
                <Switch
                  color="primary"
                  checked={isDarkMode}
                  name="darkMode"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  onChange={handleSwitchChange}
                />
              </div>
              <button type="submit">SAVE</button>
            </form>
          </div>
        </Popup>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  findUserHidden: selectFindUserHidden,
  settingsHidden: selectSettingsHidden,
});
const mapDispatchToProps = (dispatch) => ({
  toggleFindUserHidden: () => dispatch(toggleFindUserHidden()),
  toggleSettingsHidden: () => dispatch(toggleSettingsHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeSidebar);
