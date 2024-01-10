import statusbar from "../assets/Status_Bar_Light_Mode.png"
import gradient from "../assets/Background_top.png"
import React from 'react';
const MapBackground = () => {
    return (
        <div> 
            <img style={{top:'0px', position : 'absolute', width : '360px', height : '32px', zIndex : '101' }} src={statusbar}/>
            <img  style={{top:'0px', position : 'absolute', width: '360px', zIndex : '100' }} src={gradient}/>    
        </div>  
    );
  };
    
export default MapBackground;