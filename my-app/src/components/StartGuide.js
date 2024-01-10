import React from 'react';
import {useNavigate} from "react-router-dom";

import BtnExit from '../assets/StartGuideNo.png'
import BtnCont from '../assets/StartGuideYes.png'

const StartGuide = (props) => {
    const navigate = useNavigate();
    const modalOff = props.modalOff;
    const startGuideOn = props.startGuideOn;

    return (
        <>
        <div id="start-guide-back"/>
        <div id="exit-guide-card">
            <div id="start-guide-main-text">해당 코스를 걸어볼까요?</div>
            <div id="exit-guide-sub-text">아직 볼거리가 많이 남았어요!</div>
            <div>
                <div onClick={()=>{modalOff(); startGuideOn();}}>
                    <img id="exit-guide-btn-cnt" src={BtnCont}/>
                </div>
                <div onClick={modalOff}>
                    <img id="exit-guide-btn-exit" src={BtnExit}/>
                </div>
            </div>
        </div>
        </>
    );
};

export default StartGuide;