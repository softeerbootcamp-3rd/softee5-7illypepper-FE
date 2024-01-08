import { useNavigate } from "react-router-dom";
import StartButton from "../components/StartButton";
import StartButtonDark from "../components/StartButtonDark";
import BackButton from "../components/BackButton"
import DefaultBackground from "../components/DefaultBackground";
import { useForm, FormProvider, Controller } from "react-hook-form"

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { watch, register, handleSubmit} = methods;
  const id = watch("id");
  
  return (
    <div>
        <DefaultBackground/>
        <div className="background" style = {{display:'flex', justifyContent :'center'}}>
            <div  style={{display:'flex',position : 'absolute', top : '50px', left :'20px'}}>
                <BackButton />
            </div>
            <div style={{display:'flex',position : 'absolute', top : '98px', left :'20px'}}>
                <div id="login-text">반가워요!<br/>휴대폰 번호로 로그인해주세요.</div>
            </div>
            <input
                id="login-input"
                style={{display:'flex',position : 'absolute', top : '209px', left :'20px'}}
                placeholder="휴대폰 번호 (-없이 숫자만 입력)"
                aria-label="id"
                {...register("id" , { required: true })}>
            </input>
            {
                id === "" || id === undefined ?
                <div style = {{position : 'absolute', top : '712px'}} >
                    <StartButtonDark />
                </div>
                :
                <div style = {{position : 'absolute', top : '712px'}} onClick={() => {navigate("/login")}}>
                    <StartButton />
                </div>
            }
            
        </div>
    </div>
  );
};
  
  export default Login;