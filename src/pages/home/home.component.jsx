import React,{useState,useEffect} from 'react';
import './home.styles.scss';

//components
import HomeSidebar from '../../components/home-sidebar/home-sidebar.component';
import HomeContainer from '../../components/home-container/home-container.component';

//libs
import {useParams} from 'react-router-dom';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//utils
import { getUser } from '../../utils/user.firebase';

const Home = () => {
  const {id} = useParams();
  const [friend,setFriend] = useState({});
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    id?
    getUser(id)
    .then(res=>{
      // console.log(res);
      setFriend(res);
      setLoading(false);
    })
    :setFriend({});
  },[id])
  return(
    <div className="home">
      <HomeSidebar/>
      {
        id?(!loading?<HomeContainer friend={friend}/>:<div className="loader-container">	<Loader type="TailSpin" color="#7209B7" height={80} width={80} /></div>):null
      }
    </div>
  )
}

export default Home;