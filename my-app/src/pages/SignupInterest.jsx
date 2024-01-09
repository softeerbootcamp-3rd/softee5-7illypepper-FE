import { useNavigate } from "react-router-dom";
import StartButton from "../components/StartButton";
import StartButtonDark from "../components/StartButtonDark";
import BackButton from "../components/BackButton"
import DefaultBackground from "../components/DefaultBackground";
import React, { useEffect, useState } from 'react';
import InterestButton from "../components/InterestButton";
import axios from "axios";

const SignupInterest = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [array, setArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0]);
  const [selectedNum, setSelectedNum] = useState(0);
  const textArray = ["인생샷","공방 체험", "음악", "독서", "페스티벌", "영화", "역사 지식", "스포츠", "공원", "커뮤니티", "뷰티 생활", "당 충전", "맛집 탐방", "전시 관람", "패션", "도움"];

    useEffect(()=>{
        setNickname(window.localStorage.getItem('nickname'));
    },[])

    const onPressed = (value) => {
        const newArray = [...array]; 
        let newSelectedNum = selectedNum;
    
        if(newArray[value] === 1) {
            newArray[value] = 0;
            newSelectedNum -= 1;
        } else {
            newArray[value] = 1;
            newSelectedNum += 1;
        }
    
        setArray(newArray); 
        setSelectedNum(newSelectedNum); 
    };

    const signUp = async (selectedTexts) => {
        try {
            const phone = window.localStorage.getItem('phone');
            const nickname = window.localStorage.getItem('nickname');
            const response = await axios.post('/member/signin', {
                phone : phone,
                nickname : nickname
            });
            console.log("Location sent to server: ", response.data);
            window.localStorage.setItem('Id', response.data.id);
            //sendInfoToServer(response.data.id, selectedTexts);
        } catch (error) {
            console.error("Error sending location to server: ", error);
        }
    }

    const sendInfoToServer = async (id, data) => {
        console.log(id);
        console.log(data);
        try {
            const response = await axios.post('/member/favorite', {
                memberId : id,
                category : data
            });
            console.log("Location sent to server: ", response.data);

        } catch (error) {
            console.error("Error sending location to server: ", error);
        }
    };

    const postRequest = () => {
        const selectedTexts = array.map((value, index) => {
            return value === 1 ? textArray[index] : null;
        }).filter(text => text !== null);
        signUp(selectedTexts);
    }

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
            {/* <div style={{position : 'absolute', top : '168px', left : '20px'}}>
                <div id="login-text-mini">
                    최대 3개까지 선택할 수 있어요.
                </div>
            </div> */}
            <div style={{position : 'absolute', top : '230px', left : '20px'}}>
                <div>
                    <div style= {{display : 'flex'}}>
                        {[0, 1, 2, 3].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}} key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                    <div style= {{marginTop : '13px',display : 'flex'}}>
                        {[4, 5, 6, 7].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}}  key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                    <div style= {{marginTop : '13px',display : 'flex'}}>
                        {[8, 9, 10 ,11].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}}  key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                    <div style= {{marginTop : '13px',display : 'flex'}}>
                        {[12, 13, 14, 15].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}}  key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                </div>
            </div>
            {
                selectedNum === 0 ?
                <div style = {{position : 'absolute', top : '712px'}} >
                    <StartButtonDark  />
                </div>
                :
                <div onClick={() => {postRequest();}} style = {{position : 'absolute', top : '712px'}}>
                    <StartButton loc="/home"/>
                </div>
            }
        </div>
    </div>
  );
};
  
  export default SignupInterest;