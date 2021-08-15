import React from 'react';
import './header.styles.scss';

const Header = ({text}) => {
  return(
    <div className="header">{text}</div>
  )
}

export default Header;