import { useNavigate } from "react-router-dom";
import Mapbef from "../assets/map_bef.png";
import DefaultBackground from "../components/DefaultBackground";
import React,{ useEffect, useState }  from 'react';
import NextButton from "../components/NextButton";
import NextButtonNot from "../components/NextButtonNot";
const NavTime = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [array, setArray] = useState([0, 0, 0, 0, 0, 0, 0]);
  const nickname = window.localStorage.getItem('nickname');

  const onPressed = (value, index) => {
    if(array[index] === 1) {
      setArray(array.map((item, idx) => idx === index ? 0 : item));
      setSelected(0);
    } else {
      let newArray = array.map((item, idx) => idx === index ? 1 : 0);
      setArray(newArray);
      setSelected(value);
    }
  };

  return (
    <div>
        <DefaultBackground/>
        <div >
            <div >
                <div style={{display:'flex',position : 'absolute', top : '72px', left : '20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="326" height="6" viewBox="0 0 326 6" fill="none">
                        <path d="M322.523 3.40869L2.59132 3.40869" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div style={{display:'flex',position : 'absolute', top : '72px', left : '20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="112" height="6" viewBox="0 0 112 6" fill="none">
                        <path d="M109.235 3.40869L2.59153 3.40869" stroke="#FF8058" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            <div style={{position : 'absolute', top : '120px', left : '20px'}}>
                <div id="nav-time-text">
                    <span id = "nav-time-text-empha">{nickname}</span>님,<br/>오늘은 몇분 정도 걸어볼까요?</div>
            </div>
            <div>
                {
                    array[1] ?
                    <div id="nav-time-textin-empha" style={{display:'flex',position : 'absolute', top : '280px', left : '20px'}}>
                    <div onClick={() => {onPressed(5, 1);}} style={{position : 'absolute', top: '34px', left :'31px'}}>5분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
                            <circle cx="45" cy="45.063" r="45" fill="#FFF2EE"/>
                        </svg>
                    </div>
                :
                    <div id="nav-time-textin" style={{display:'flex',position : 'absolute', top : '280px', left : '20px'}}>
                    <div onClick={() => {onPressed(5, 1);}} style={{position : 'absolute', top: '34px', left :'31px'}}>5분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                            <circle cx="45.4766" cy="45.063" r="45" fill="#F4F4F4"/>
                        </svg> 
                    </div>

                }
                {
                    array[2] ?
                    <div id="nav-time-textin-empha" style={{display:'flex',position : 'absolute', top : '280px', left : '135px'}}>
                    <div onClick={() => {onPressed(10, 2);}} style={{position : 'absolute', top: '34px', left :'27px'}}>10분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
                            <circle cx="45" cy="45.063" r="45" fill="#FFF2EE"/>
                        </svg>
                    </div>
                :       
                    <div id="nav-time-textin" style={{display:'flex',position : 'absolute', top : '280px', left : '135px'}}>
                    <div onClick={() => {onPressed(10, 2);}}  style={{position : 'absolute', top: '34px', left :'27px'}}>10분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                            <circle cx="45.4766" cy="45.063" r="45" fill="#F4F4F4"/>
                        </svg> 
                    </div>
                }
                {
                    array[3] ?
                    <div id="nav-time-textin-empha" style={{position : 'absolute', top : '280px', left : '250px'}}>
                    <div onClick={() => {onPressed(15, 3);}} style={{position : 'absolute', top: '34px', left :'27px'}}>15분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
                            <circle cx="45" cy="45.063" r="45" fill="#FFF2EE"/>
                        </svg>
                    </div>
                :       
                    <div id="nav-time-textin" style={{position : 'absolute', top : '280px', left : '250px'}}>                   
                        <div onClick={() => {onPressed(15, 3);}}  style={{position : 'absolute', top: '34px', left :'27px'}}>15분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                            <circle cx="45.4766" cy="45.063" r="45" fill="#F4F4F4"/>
                        </svg> 
                    </div>
                }
                {
                    array[4] ?
                    <div id="nav-time-textin-empha" style={{display:'flex',position : 'absolute', top : '380px', left : '20px'}}>
                    <div onClick={() => {onPressed(20, 4);}} style={{position : 'absolute', top: '34px', left :'27px'}}>20분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
                            <circle cx="45" cy="45.063" r="45" fill="#FFF2EE"/>
                        </svg>
                    </div>
                :                        
                    <div id="nav-time-textin" style={{display:'flex',position : 'absolute', top : '380px', left : '20px'}}>
                    <div onClick={() => {onPressed(20, 4);}}  style={{position : 'absolute', top: '34px', left :'27px'}}>20분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                            <circle cx="45.4766" cy="45.063" r="45" fill="#F4F4F4"/>
                        </svg> 
                    </div>
                }
                {
                    array[5] ?
                    <div id="nav-time-textin-empha" style={{display:'flex',position : 'absolute', top : '380px', left : '135px'}}>
                    <div onClick={() => {onPressed(30, 5);}} style={{position : 'absolute', top: '34px', left :'27px'}}>30분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
                            <circle cx="45" cy="45.063" r="45" fill="#FFF2EE"/>
                        </svg>
                    </div>
                :                        
                    <div id="nav-time-textin" style={{display:'flex',position : 'absolute', top : '380px', left : '135px'}}>
                    <div onClick={() => {onPressed(30, 5);}}  style={{position : 'absolute', top: '34px', left :'27px'}}>30분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                            <circle cx="45.4766" cy="45.063" r="45" fill="#F4F4F4"/>
                        </svg> 
                    </div>
                }
                {
                    array[6] ?
                    <div id="nav-time-textin-empha" style={{display:'flex',position : 'absolute', top : '380px', left : '250px'}}>
                    <div onClick={() => {onPressed(60, 6);}} style={{position : 'absolute', top: '34px', left :'27px'}}>60분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
                            <circle cx="45" cy="45.063" r="45" fill="#FFF2EE"/>
                        </svg>
                    </div>
                :       
                    <div id="nav-time-textin" style={{display:'flex',position : 'absolute', top : '380px', left : '250px'}}>
                    <div onClick={() => {onPressed(60, 6);}} style={{position : 'absolute', top: '34px', left :'27px'}}>60분</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                            <circle cx="45.4766" cy="45.063" r="45" fill="#F4F4F4"/>
                        </svg> 
                    </div>
                }
            </div>
            <div onClick={() => {navigate(-1);}}>
                <img style={{top : '700px', left : '20px',position : 'absolute', width : '48px', height : '48px'}} src={Mapbef}/>
            </div>
            {
                selected === 0 ?
                 <div style={{position:'absolute', top:'700px', left :'200px'}}>
                    <NextButtonNot/>
                 </div>
                 :
                 <div style={{position:'absolute', top:'700px', left :'200px'}}>
                    <NextButton loc="/navdest"/>
                 </div>
            }
        </div>
    </div>
  );
};
  
  export default NavTime;