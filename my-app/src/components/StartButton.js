import React from 'react';
import { useNavigate } from "react-router-dom";
const StartButton = (props) => {
  const navigate = useNavigate();
  return (
    <div>
        <div id="startbutton"  onClick={() => {navigate(props.loc)}}>
            <div id="startbutton-text">다음으로</div>
        </div>
    </div>
  );
};
  
  export default StartButton;