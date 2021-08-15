import React from "react";
import '../../utils/variables.scss';
import "./icon-button.styles.scss";

//icons
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExploreIcon from "@material-ui/icons/Explore";
import SettingsIcon from "@material-ui/icons/Settings";

const IconButton = ({ iconName, text }) => {
  return (
    <div className="icon-button">
      {iconName === "add" ? (
        <AddCircleIcon />
      ) : iconName === "explore" ? (
        <ExploreIcon />
      ) : (
        <SettingsIcon />
      )}

      {text}
    </div>
  );
};

export default IconButton;
