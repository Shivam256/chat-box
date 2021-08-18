import React from 'react';
import './home.styles.scss';

//components
import HomeSidebar from '../../components/home-sidebar/home-sidebar.component';
import HomeContainer from '../../components/home-container/home-container.component';

import {useParams} from 'react-router-dom';

const Home = () => {
  const {id} = useParams();
  return(
    <div className="home">
      <HomeSidebar/>
      <HomeContainer/>
    </div>
  )
}

export default Home;