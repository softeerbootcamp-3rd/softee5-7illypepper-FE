import Exit from "../assets/icon_signout.png";
import { useNavigate } from "react-router-dom";
import React from 'react';

const MapExitButton = (props) => {
    const navigate = useNavigate();
    const exitOn = props.exitOn;
    return (
      <div id = "button-style" onClick={exitOn}>
        <img style={{width : '24px', height : '24px' }} src={Exit}/>
      </div>
    );
  };
    
export default MapExitButton;