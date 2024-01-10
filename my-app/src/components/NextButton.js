import { useNavigate } from "react-router-dom";
import React from 'react';

const NextButton = (props) => {
    const navigate = useNavigate();
    return (
      <div style={{display : 'flex', justifyContent :'center', alignItems :'center'}} id="nav-next-button" onClick={() => {navigate(props.loc)}}>
        <div id="nav-next-button-text">다음으로</div>
      </div>
    );
  };
    
export default NextButton;