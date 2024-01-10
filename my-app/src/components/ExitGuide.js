import React from 'react';
import {useNavigate} from "react-router-dom";

import BtnExit from '../assets/ExitGuide/Exit.png'
import BtnCont from '../assets/ExitGuide/No.png'

const ExitGuide = (props) => {
    const navigate = useNavigate();
    const exitGuideOff = props.exitGuideOff;
    const turnOff = props.turnOff;
    return (
        <>
        <div id="exit-guide-back"/>
        <div id="exit-guide-card">
            <div id="exit-guide-main-text">안내를 종료할까요?</div>
            <div id="exit-guide-sub-text">아직 볼거리가 많이 남았어요!</div>
            <div>
                <div onClick={exitGuideOff}>
                    <img id="exit-guide-btn-cnt" src={BtnCont}/>
                </div>
                <div onClick={()=>{exitGuideOff();turnOff();}}>
                    <img id="exit-guide-btn-exit" src={BtnExit}/>
                </div>
            </div>
        </div>
        </>
    );
};

export default ExitGuide;