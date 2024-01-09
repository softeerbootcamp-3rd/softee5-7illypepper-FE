import statusbar from "../assets/Status_Bar_Light_Mode.png"
import React from 'react';
const DefaultBackground = () => {
    return (
        <div className="background">
            <div >
                <img style={{width : '360px', height : '32px'}} src={statusbar}/>
            </div>   
        </div>
    );
  };
    
export default DefaultBackground;