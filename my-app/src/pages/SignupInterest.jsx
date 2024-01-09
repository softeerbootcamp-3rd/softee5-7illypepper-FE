import { useNavigate } from "react-router-dom";
import StartButton from "../components/StartButton";
import StartButtonDark from "../components/StartButtonDark";
import BackButton from "../components/BackButton"
import DefaultBackground from "../components/DefaultBackground";
import { useForm, FormProvider, Controller } from "react-hook-form";
import React, { useEffect, useState } from 'react';

const SignupInterest = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const id = 1;
  
    useEffect(()=>{
        setNickname(window.localStorage.getItem('nickname'));
    },[])

  return (
    <div>
        <DefaultBackground/>
        <div style = {{display:'flex', justifyContent :'center'}}>
            <div  style={{display:'flex',position : 'absolute', top : '50px', left :'20px'}}>
                <BackButton />
            </div>           
            <div style={{position : 'absolute', top : '98px', left : '20px'}}>
                <div id="nav-time-text">
                    <span id = "nav-time-text-empha">{nickname}</span>님의 관심사를<br/>선택해주세요.</div>
            </div>
            {
                id === "" || id === undefined ?
                <div style = {{position : 'absolute', top : '712px'}} >
                    <StartButtonDark  />
                </div>
                :
                <div style = {{position : 'absolute', top : '712px'}}>
                    <StartButton loc="/signupinterest" />
                </div>
            }
            
        </div>
    </div>
  );
};
  
  export default SignupInterest;