import { useNavigate } from "react-router-dom";
import Mapbef from "../assets/map_bef.png";
import DefaultBackground from "../components/DefaultBackground";
import React,{ useEffect, useState }  from 'react';
import NextButton from "../components/NextButton";
import NextButtonNot from "../components/NextButtonNot";
import DestYes from "../assets/dest_yes.png";
import DestNo from "../assets/dest_no.png";
import DestNoEmpha from "../assets/dest_no_empha.png";

const NavDest = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);

  const onPressed = () => {
    if(selected)
        setSelected(false);
    else
        setSelected(true);
  };

  return (
    <div>
        <DefaultBackground/>
        <div >
                <div style={{display:'flex',position : 'absolute', top : '72px', left : '20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="326" height="6" viewBox="0 0 326 6" fill="none">
                        <path d="M322.523 3.40869L2.59132 3.40869" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div style={{display:'flex',position : 'absolute', top : '72px', left : '20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="219" height="6" viewBox="0 0 219 6" fill="none">
                        <path d="M215.871 3.40869L2.59109 3.40869" stroke="#FF8058" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            <div style={{position : 'absolute', top : '120px', left : '20px'}}>
                <div id="nav-time-text">
                    가려고 하는<br/>
                    목적지가 있으신가요?
                </div>
            </div>
            <div style={{top : '250px', left : '20px',position : 'absolute'}}>
                <div id="nav-dest-text-title" style={{top : '23px', left : '14px',position : 'absolute'}}>목적지가 있어요</div>
                <div id="nav-dest-text-main" style={{top : '60px', left : '14px',position : 'absolute'}}>어디로 갈지<br/>직접 정할래요</div>
                <img  src={DestYes} style={{width: '153px', height : '190px'}}></img>
            </div>
            {
                selected === true ?
                <div onClick={() => {onPressed();}} style={{top : '250px', left : '185px',position : 'absolute'}}>
                    <div id="nav-dest-text-title-empha" style={{top : '23px', left : '14px',position : 'absolute'}}>따로 없어요</div>
                    <div id="nav-dest-text-main-empha" style={{top : '60px', left : '14px',position : 'absolute'}}>코스만 바로<br/>추천받을래요</div>
                    <img  src={DestNoEmpha} style={{width: '153px', height : '190px'}}></img>
                </div>
                :
                <div onClick={() => {onPressed();}}  style={{top : '250px', left : '185px',position : 'absolute'}}>
                    <div id="nav-dest-text-title" style={{top : '23px', left : '14px',position : 'absolute'}}>따로 없어요</div>
                    <div id="nav-dest-text-main" style={{top : '60px', left : '14px',position : 'absolute'}}>코스만 바로<br/>추천받을래요</div>
                    <img  src={DestNo} style={{width: '153px', height : '190px'}}></img>
                </div>
            }
            <div></div>
        <div >
            <div onClick={() => {navigate(-1);}}>
                <img style={{top : '700px', left : '20px',position : 'absolute', width : '48px', height : '48px'}} src={Mapbef}/>
            </div>
            {
                selected !== true ?
                 <div style={{position:'absolute', top:'700px', left :'200px'}}>
                    <NextButtonNot/>
                 </div>
                 :
                 <div style={{position:'absolute', top:'700px', left :'200px'}}>
                    <NextButton loc="/"/>
                 </div>
            }
        </div>
    </div>
  );
};
  
  export default NavDest;