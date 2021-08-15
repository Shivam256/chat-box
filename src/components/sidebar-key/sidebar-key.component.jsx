import React from 'react';
import './sidebar-key.styles.scss';

import {Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';


const SidebarKey = ({imageUrl,name,pathName,isSelected}) => {
  return (
    <Link to={pathName}>
      <div className={`sidebar-key ${isSelected?'sidebar-key-selected':''}`}>
        <Avatar src={imageUrl} className="sidebar-key-img"/>
        <p>{name}</p>
      </div>
    </Link>
    
  )
}

export default SidebarKey;