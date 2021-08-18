import React, { useState, useEffect } from "react";
import "./home-sidebar.styles.scss";

//utils
import { getUserFriends } from "../../utils/user.firebase";

//components
import SidebarKey from "../sidebar-key/sidebar-key.component";
import IconButton from "../icon-button/icon-button.component";
import Popup from "../popup/popup.component";
import FormInput from "../form-input/form-input.component";

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

const HomeSidebar = ({
  currentUser,
  toggleFindUserHidden,
  toggleSettingsHidden,
  findUserHidden,
  settingsHidden,
}) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getUserFriends(currentUser.uid).then((res) => {
      Promise.all(res).then((result) => {
        setFriends(result);
      });
    });
  }, [currentUser]);
  return (
    <div className="home-sidebar">
      <div className="home-btn">HOME</div>
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
      {
        !findUserHidden ? 
        <Popup>
          <div className="find-user-container">
            <h1>CONNECT WITH PEOPLE</h1>
          </div>
        </Popup> 
        : null
      }

      <IconButton
        iconName="settings"
        text="SETTINGS"
        onClick={toggleSettingsHidden}
      />
      {!settingsHidden ? (
        <Popup>
          <div className="settings-container">
            <h1>SETTINGS</h1>
            <FormInput label="CHANGE USERNAME:" name="newUsername" />
            <FormInput label="CHANGE PROFILE PIC:" name="newUsername" />
            <div className="dark-mode-container">
              DARK MODE:
              <Switch
                
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <button type="submit">SAVE</button>
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
