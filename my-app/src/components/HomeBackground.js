import statusbar from "../assets/Status_Bar_Light_Mode.png"
import React from 'react';
import MainHomeBackground from "../assets/mainhome_background.jpg";
const HomeBackground = () => {
    return (
        <div>
            <img style={{position : 'absolute', left:'0px', top:'0px', width :'360px', height :'800px'}} src={MainHomeBackground} />
            <div>
                <img style={{position : 'absolute', left:'0px',top:'0px',width : '360px', height : '32px',zIndex : 1 }} src={statusbar}/>
            </div>   
        </div>
    );
  };
    
export default HomeBackground;