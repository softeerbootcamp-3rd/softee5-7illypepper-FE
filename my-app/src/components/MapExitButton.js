import Exit from "../assets/icon_signout.png";
import { useNavigate } from "react-router-dom";
import React from 'react';

const MapExitButton = () => {
    const navigate = useNavigate();
    return (
      <div id = "button-style" onClick={() => {}}>
        <img style={{width : '24px', height : '24px' }} src={Exit}/>
      </div>
    );
  };
    
export default MapExitButton;