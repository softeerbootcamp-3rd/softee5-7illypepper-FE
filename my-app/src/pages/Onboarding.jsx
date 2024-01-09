import { useNavigate } from "react-router-dom";
import StartButton from "../components/StartButton";
import DefaultBackground from "../components/DefaultBackground";
import logo from '../logo.svg';
import React from 'react';
const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DefaultBackground/>
        <div style = {{display:'flex', justifyContent :'center'}}>
          <div style = {{position : 'absolute', top : '223.25px', left : '120px',width: '120px', 
            height: '120px',
            flexShrink: '0',
            background: '#D9D9D9',
            display:'flex', 
            justifyContent :'center'
            }}>
              <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div style = {{position : 'absolute', top : '684px'}} onClick={() => {navigate("/login")}}>
            <StartButton />
          </div>
          <div style={{display:'flex',position : 'absolute', top : '744.4px' }}> 
            <div id="onboarding-account-text">이미 계정이 있나요?</div>
            <div id="onboarding-login-text">로그인</div>
          </div>
        </div>
      </div>
  );
};
  
export default Onboarding;