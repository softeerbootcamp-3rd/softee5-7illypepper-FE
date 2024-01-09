import React from 'react';
import { useNavigate } from "react-router-dom";
const StartButton = (props) => {
  const navigate = useNavigate();
  const saveLocalStorage = () => {
    window.localStorage.setItem(props.localkey, props.localvalue);
  }

  return (
    <div>
        <div id="startbutton"  onClick={() => {navigate(props.loc); saveLocalStorage();}}>
            <div id="startbutton-text">다음으로</div>
        </div>
    </div>
  );
};
  
  export default StartButton;