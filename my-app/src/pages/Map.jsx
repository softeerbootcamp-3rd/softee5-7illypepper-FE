import { useNavigate } from "react-router-dom";
import MapBackground from "../components/MapBackground";
import Tmap from "../components/Tmap";
import ExitButton from "../components/MapExitButton";
import MapSelect from "../components/MapSelect";
import React, {useState} from 'react';
import RouteWalk from "../components/RouteWalk";
import StartGuide from "../components/StartGuide";
import ExitGuide from "../components/ExitGuide";
import Popup from "../components/Popup";

const Map = () => {
  const navigate = useNavigate();
  const curPos = "양재동";
  const [modalOn, setModalOn] = useState(false);
  const [startGuide, setStartGuide] = useState(false);
  const [exitGuide, setExitGuide] = useState(false);
  const [popup, setPopup] = useState(false);
  return (
    <div>
        <MapBackground/>
        <RouteWalk popupTrue= {()=>setPopup(true)}/>
        <div style = {{position : 'absolute', top : '50px', left : '20px', zIndex : '101'}}>
            <div id ="map-curposintro-text">지금 위치한 지역은</div>
        </div>
        <div style = {{position : 'absolute', top : '73px', left : '20px', zIndex : '101'}}>
            <div id ="map-curpos-text">{curPos}</div>
        </div>
        <div style = {{position : 'absolute', top : '50px', left : '300px', zIndex : '101'}}>
            <ExitButton exitOn={()=>{if(startGuide)
                                        setExitGuide(true);}}/>
        </div>
        {
            !startGuide ?
            <>
                <div style = {{position : 'absolute', top : '620px', left : '-280px'}}>
                    <MapSelect />
                </div>
                <div style = {{position : 'absolute', top : '620px', left : '32px'}}>
                    <MapSelect func={()=>{setModalOn(true);}}/>
                </div>
                <div style = {{position : 'absolute', top : '620px', left : '344px'}}>
                    <MapSelect />
                </div>
            </>
            :
            <></>           
        }    
        {
            modalOn ?
            <StartGuide modalOff={()=>{setModalOn(false);}} startGuideOn={()=>{setStartGuide(true);}}/>
            :
            <></>
        }
        {
            exitGuide ?
            <ExitGuide exitGuideOff={()=>{setExitGuide(false);}} turnOff={()=>{navigate('/endcourse')}} />
            :
            <></>
        }
        {
            popup ?
            <Popup func={()=>setPopup(false)}/>
            :
            <></>
        }
    </div>
  );
};
  
  export default Map;