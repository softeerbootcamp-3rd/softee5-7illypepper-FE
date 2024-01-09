import { useNavigate } from "react-router-dom";
import StartButton from "../components/StartButton";
import StartButtonDark from "../components/StartButtonDark";
import BackButton from "../components/BackButton"
import DefaultBackground from "../components/DefaultBackground";
import { useForm, FormProvider, Controller } from "react-hook-form";
import React from 'react';

const SignupNickname = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { watch, register, handleSubmit} = methods;
  const id = watch("id");
  
  return (
    <div>
        <DefaultBackground/>
        <div style = {{display:'flex', justifyContent :'center'}}>
            <div  style={{display:'flex',position : 'absolute', top : '50px', left :'20px'}}>
                <BackButton />
            </div>
            <div style={{position : 'absolute', top : '98px', left :'20px'}}>
                <div id="login-text">닉네임을 설정해주세요.</div>
                <div id="login-text-mini">나중에 언제든지 닉네임을 변경할 수 있어요.</div>
            </div>
            <input
                id="login-input"
                style={{display:'flex',position : 'absolute', top : '209px', left :'20px'}}
                placeholder="닉네임 입력"
                aria-label="id"
                {...register("id" , { required: true })}>
            </input>
            {
                id === "" || id === undefined ?
                <div style = {{position : 'absolute', top : '712px'}} >
                    <StartButtonDark  />
                </div>
                :
                <div style = {{position : 'absolute', top : '712px'}} onClick={() => {navigate("/navtime")}}>
                    <StartButton loc="/navdest" />
                </div>
            }
            
        </div>
    </div>
  );
};
  
  export default SignupNickname;