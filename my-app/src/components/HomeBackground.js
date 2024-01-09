import statusbar from "../assets/Status_Bar_Light_Mode.png"
import React from 'react';
const HomeBackground = () => {
    return (
        <div className="home-background">
            <div >
                <img style={{width : '360px', height : '32px'}} src={statusbar}/>
            </div>   
        </div>
    );
  };
    
export default HomeBackground;