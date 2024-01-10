import React from 'react';
import {useNavigate} from "react-router-dom";
import popupTop from "../assets/popup_top.png";
import popupRec from "../assets/popup_rec.png";

const Popup = () => {
    const navigate = useNavigate();

    return (
        <>
        <img style={{position:'absolute',top : '470px', left :'20px',zIndex :'1005', width : '60px', height:'60px'}} src={popupTop}/>
        <img style={{position:'absolute',top : '570px', left :'34px',zIndex :'1005', width : '284px', height:'96px'}} src={popupRec}/>
        <div id="start-guide-back"/>
        <div style={{position:'absolute',left : '3px',top : '500px',zIndex :'1004'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="351" height="291" viewBox="0 0 351 291" fill="none">
                    <g filter="url(#filter0_d_206_11061)">
                        <path d="M15.9307 31.6621C15.9307 20.6164 24.885 11.6621 35.9307 11.6621H315.931C326.976 11.6621 335.931 20.6164 335.931 31.6621V251.662C335.931 262.708 326.976 271.662 315.931 271.662H35.9307C24.885 271.662 15.9307 262.708 15.9307 251.662V31.6621Z" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_206_11061" x="0.930664" y="0.662109" width="350" height="290" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="7.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_206_11061"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_206_11061" result="shape"/>
                        </filter>
                    </defs>
                    </svg>
                <div style={{position:'absolute',top : '32px', left : '40px'}} id="popup-card-text">윤수님이 좋아할 장소가 근처에 있어요!</div>
                <div style={{position:'absolute',top : '192px', left : '34px'}} id="popup-button">
                    <div id="popup-button-text">더 알아볼래요</div>
                </div>
            </div>
        </>
    );
};

export default Popup;