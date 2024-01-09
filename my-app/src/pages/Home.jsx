import { useNavigate } from "react-router-dom";
import HomeBackground from "../components/HomeBackground";
import React from 'react';
import Menubar from '../assets/menubar.png';
import MenubarButton from '../assets/menubar_walkcircle.png';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
        <HomeBackground/>
        <div onClick={() => {navigate('/navtime');}}style ={{position : 'absolute', top : '690px', left : '150px', zIndex :'1'}} >
            <img src={MenubarButton} style ={{ width : '66px', height : '66px'}}/>
        </div>
        <div>
            <img src={Menubar} style ={{position : 'absolute', top : '700px', width : '360px'}}/>
        </div>
    </div>
  );
};
  
  export default Home;