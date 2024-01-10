import { useNavigate } from "react-router-dom";
import HomeBackground from "../components/HomeBackground";
import React from 'react';
import Menubar from '../assets/menubar.png';
import MenubarButton from '../assets/menubar_walkcircle.png';

const Home = () => {
  const navigate = useNavigate();
  const nickname = window.localStorage.getItem('nickname');
  return (
    <div>
        <HomeBackground/>
        <div style={{position : 'absolute', left:'20px', top:'70px' }}>
            <div id="nav-time-text">{nickname}님,<br/>오늘은 이런 코스 어때요?</div>
        </div>
        <div onClick={() => {navigate('/navtime');}}style ={{position : 'absolute', top : '690px', left : '150px', zIndex :'1'}} >
            <img src={MenubarButton} style ={{ width : '66px', height : '66px'}}/>
        </div>
        <div>
            <img src={Menubar} style ={{position : 'absolute', top : '700px', width : '360px'}}/>
        </div>
        <div style={{position : 'absolute', left:'65px', top:'730px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                <path d="M24.2768 11.3499L15.5268 3.09431C15.5225 3.09058 15.5185 3.08656 15.5148 3.08228C15.1926 2.7893 14.7728 2.62695 14.3374 2.62695C13.9019 2.62695 13.4821 2.7893 13.1599 3.08228L13.1479 3.09431L4.40775 11.3499C4.22947 11.5139 4.08716 11.713 3.98982 11.9348C3.89249 12.1566 3.84225 12.3962 3.84229 12.6384V22.7501C3.84229 23.2142 4.02666 23.6593 4.35485 23.9875C4.68304 24.3157 5.12816 24.5001 5.59229 24.5001H10.8423C11.3064 24.5001 11.7515 24.3157 12.0797 23.9875C12.4079 23.6593 12.5923 23.2142 12.5923 22.7501V17.5001H16.0923V22.7501C16.0923 23.2142 16.2767 23.6593 16.6048 23.9875C16.933 24.3157 17.3782 24.5001 17.8423 24.5001H23.0923C23.5564 24.5001 24.0015 24.3157 24.3297 23.9875C24.6579 23.6593 24.8423 23.2142 24.8423 22.7501V12.6384C24.8423 12.3962 24.7921 12.1566 24.6947 11.9348C24.5974 11.713 24.4551 11.5139 24.2768 11.3499ZM23.0923 22.7501H17.8423V17.5001C17.8423 17.036 17.6579 16.5908 17.3297 16.2627C17.0015 15.9345 16.5564 15.7501 16.0923 15.7501H12.5923C12.1282 15.7501 11.683 15.9345 11.3548 16.2627C11.0267 16.5908 10.8423 17.036 10.8423 17.5001V22.7501H5.59229V12.6384L5.60432 12.6274L14.3423 4.37509L23.0813 12.6252L23.0934 12.6362L23.0923 22.7501Z" fill="#FF8058"/>
            </svg>
             <div id="home-button-text">홈</div>
        </div>
        <div style={{position : 'absolute', left:'267px', top:'730px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                <path d="M25.9383 23.1875C24.2725 20.3077 21.7055 18.2427 18.7097 17.2638C20.1915 16.3816 21.3428 15.0374 21.9868 13.4376C22.6307 11.8378 22.7317 10.0709 22.2743 8.40809C21.8168 6.74532 20.8262 5.27869 19.4545 4.23343C18.0828 3.18817 16.4059 2.62207 14.6814 2.62207C12.9568 2.62207 11.28 3.18817 9.90829 4.23343C8.53661 5.27869 7.54598 6.74532 7.08851 8.40809C6.63104 10.0709 6.73204 11.8378 7.376 13.4376C8.01995 15.0374 9.17126 16.3816 10.6531 17.2638C7.65732 18.2416 5.09029 20.3066 3.42451 23.1875C3.36343 23.2872 3.32291 23.398 3.30535 23.5135C3.28779 23.629 3.29354 23.7469 3.32227 23.8601C3.351 23.9734 3.40213 24.0798 3.47263 24.1729C3.54313 24.2661 3.63158 24.3442 3.73276 24.4027C3.83394 24.4611 3.9458 24.4987 4.06174 24.5132C4.17768 24.5277 4.29535 24.5189 4.40782 24.4872C4.52028 24.4555 4.62525 24.4016 4.71655 24.3286C4.80784 24.2557 4.8836 24.1652 4.93936 24.0625C6.99998 20.5013 10.6422 18.375 14.6814 18.375C18.7206 18.375 22.3628 20.5013 24.4234 24.0625C24.4792 24.1652 24.5549 24.2557 24.6462 24.3286C24.7375 24.4016 24.8425 24.4555 24.955 24.4872C25.0674 24.5189 25.1851 24.5277 25.301 24.5132C25.417 24.4987 25.5288 24.4611 25.63 24.4027C25.7312 24.3442 25.8196 24.2661 25.8901 24.1729C25.9606 24.0798 26.0118 23.9734 26.0405 23.8601C26.0692 23.7469 26.075 23.629 26.0574 23.5135C26.0399 23.398 25.9993 23.2872 25.9383 23.1875ZM8.55639 10.5C8.55639 9.28864 8.91561 8.10443 9.58864 7.09718C10.2617 6.08993 11.2183 5.30487 12.3375 4.84128C13.4566 4.3777 14.6882 4.2564 15.8763 4.49274C17.0645 4.72907 18.1558 5.31242 19.0124 6.16902C19.869 7.02561 20.4524 8.11698 20.6887 9.30512C20.925 10.4933 20.8037 11.7248 20.3401 12.844C19.8766 13.9632 19.0915 14.9198 18.0843 15.5928C17.077 16.2658 15.8928 16.625 14.6814 16.625C13.0575 16.6233 11.5006 15.9774 10.3523 14.8292C9.20399 13.6809 8.55812 12.124 8.55639 10.5Z" fill="#B7B7B7"/>
            </svg>
             <div id="home-profile-text">프로필</div>
        </div>
    </div>
  );
};
  
  export default Home;