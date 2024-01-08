import { useNavigate } from "react-router-dom";
import StartButton from "../components/StartButton";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="background" style = {{display:'flex', justifyContent :'center'}}>
        <div style = {{position : 'absolute', top : '223.25px', left : '120px',width: '120px', 
          height: '120px',
          flexShrink: '0',
          background: '#D9D9D9'}}>
            <image src="../logo.svg"/>
        </div>
        <div style = {{position : 'absolute', top : '684px'}}>
          <StartButton />
        </div>
        <div style={{display:'flex',position : 'absolute', top : '744.4px' }}> 
          <div id="onboarding-account-text">이미 계정이 있나요?</div>
          <div id="onboarding-login-text">로그인</div>
        </div>
       
      </div>
    </main>
  );
};
  
  export default Onboarding;