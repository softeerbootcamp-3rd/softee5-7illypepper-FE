import { useNavigate } from "react-router-dom";
import MapBackground from "../components/MapBackground";
import Tmap from "../components/Tmap";
import ExitButton from "../components/MapExitButton";
import MapSelect from "../components/MapSelect";
import React from 'react';
import RouteWalk from "../components/RouteWalk";

const Map = () => {
  const navigate = useNavigate();
  const curPos = "양재동";
  return (
    <div>
        <MapBackground/>
         {/* <RouteWalk/> */}
        <div style = {{position : 'absolute', top : '50px', left : '20px', zIndex : '101'}}>
            <div id ="map-curposintro-text">지금 위치한 지역은</div>
        </div>
        <div style = {{position : 'absolute', top : '73px', left : '20px', zIndex : '101'}}>
            <div id ="map-curpos-text">{curPos}</div>
        </div>
        <div style = {{position : 'absolute', top : '50px', left : '300px', zIndex : '101'}}>
            <ExitButton/>
        </div>
        <div style = {{position : 'absolute', top : '620px', left : '-280px'}}>
            <MapSelect />
        </div>
        <div style = {{position : 'absolute', top : '620px', left : '32px'}}>
            <MapSelect />
        </div>
        <div style = {{position : 'absolute', top : '620px', left : '344px'}}>
            <MapSelect />
        </div>
    </div>
  );
};
  
  export default Map;