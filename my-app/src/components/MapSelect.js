import TimeIcon from "../assets/icon_timer.png"
import LoveIcon from "../assets/icon_heart.png"
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import StartGuide from "../components/StartGuide"
import navImg1 from "../assets/nav_img1.png"
import navImg2 from "../assets/nav_img2.png"
import navImg3 from "../assets/nav_img3.png"

const MapSelect = (props) => {
    const navigate = useNavigate();
    const setModalOn = props.func;

    return (
      <div id = "map-select-card">
        <div>
            <div id="map-select-card-text" style={{position : 'relative', top : '16px', left : '18px'}}>피톤치드 가득한 공원 주변 코스</div>
        </div>
        <div style={{display :'flex', alignItems: 'center'  }}>
            <div style={{display :'flex', alignItems: 'center' , position : 'relative', left : '18px' , top : '18px' }}>
                <div id="map-select-card-background">
                    <div id="map-select-card-theme-text">인생샷 명소</div>
                </div>
                <div id="map-select-card-background">
                    <div id="map-select-card-theme-text">꽃길</div>
                </div>
                <div id="map-select-card-background">
                    <div id="map-select-card-theme-text">힐링</div>
                </div>
            </div>
            <div style = {{display :'flex', alignItems: 'center', position : 'relative', left : '44px' , top : '18px'}}>
                <img src={TimeIcon} style={{ width : '18px', height: '18px'}}/>
                <div id="map-select-card-small-text" style={{position : 'relative', left : '2px'}}>15분</div>
            </div>
            <div style = {{display :'flex', alignItems: 'center', position : 'relative', left : '54px' , top : '18px' }}>
                <img src={LoveIcon} style={{width : '18px', height: '18px'}}/>
                <div id="map-select-card-small-text" style={{position : 'relative', left : '2px'}}>3개</div>
            </div>
        </div>
        <div id="map-select-card-button" style = {{position : 'relative', left : '160px' , top : '45px', display:'flex', justifyContent :'center', alignItems :'center'}}
            onClick={() => setModalOn()}>
            <div style={{position : 'relative', top : '1px'}} id="map-select-card-button-text">산책하러 가기</div>
        </div>
        <div style={{position : 'relative', top : '0px', left : '25px'}}>
            <img style={{transform : 'rotate(-5deg)' ,height : '40px', width : '40px', position : 'absolute', zIndex :'3'}} src={navImg1}/>
            <img style={{height : '40px', width : '40px', position : 'absolute', left: '30px', zIndex : '2'}} src={navImg2}/>
            <img style={{height : '40px', width : '40px', position : 'absolute', left: '60px', zIndex : '1'}} src={navImg3}/>
        </div>
      </div>
    );
  };
    
export default MapSelect;