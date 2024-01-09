import { useNavigate } from "react-router-dom";
import React from 'react';

const NextButtonNot = () => {
    const navigate = useNavigate();
    return (
      <div style={{display : 'flex', justifyContent :'center', alignItems :'center'}} id="nav-next-button-not">
        <div id="nav-next-button-not-text">다음으로</div>
      </div>
    );
  };
    
export default NextButtonNot;