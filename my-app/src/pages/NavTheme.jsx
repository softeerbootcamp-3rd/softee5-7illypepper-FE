import { useNavigate } from "react-router-dom";
import Mapbef from "../assets/map_bef.png";
import DefaultBackground from "../components/DefaultBackground";
import React,{ useEffect, useState }  from 'react';
import NextButton from "../components/NextButton";
import InterestButton from "../components/InterestButton";

const NavTheme = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0]);
  const [selectedNum, setSelectedNum] = useState(0);
  const textArray = ["계단이 없는","잔잔한", "볼거리가 많은", "북적한", "커피향이 솔솔 나는", "피톤치드 가득한", "모래길", "볼거리가 많은", "경사진", "네모난", "가로수길", "하늘이 잘 보이는", "골목길", "야시장길"];

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
  return (
    <div>
        <DefaultBackground/>
        <div >
                <div style={{display:'flex',position : 'absolute', top : '72px', left : '20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="326" height="6" viewBox="0 0 326 6" fill="none">
                        <path d="M322.523 3.40869L2.59132 3.40869" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div style={{display:'flex',position : 'absolute', top : '72px', left : '20px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="326" height="6" viewBox="0 0 326 6" fill="none">
                    <path d="M322.547 3.40869L2.61476 3.40869" stroke="#FF8058" stroke-width="5" stroke-linecap="round"/>
                </svg>
                </div>
            </div>
            <div style={{position : 'absolute', top : '120px', left : '20px'}}>
                <div id="nav-time-text">
                    어떤 길을 걸어볼까요?
                </div>
            </div>
            <div style={{position : 'absolute', top : '230px', left : '20px'}}>
                <div>
                    <div style= {{display : 'flex'}}>
                        {[0, 1, 2, 3].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}} key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                    <div style= {{marginTop : '13px',display : 'flex'}}>
                        {[4, 5, 6].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}}  key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                    <div style= {{marginTop : '13px',display : 'flex'}}>
                        {[7, 8, 9, 10].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}}  key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                    <div style= {{marginTop : '13px',display : 'flex'}}>
                        {[11, 12, 13].map((index) => {
                            return <InterestButton onPressed = {()=>{onPressed(index)}}  key={index} state={array[index]} text={textArray[index]}/>;
                        })}
                    </div>
                </div>
            </div>
        <div >
            {
                selectedNum === 0 ?
                <div onClick={() => {navigate(-1);}}>
                    <img style={{top : '700px', left : '20px',position : 'absolute', width : '48px', height : '48px'}} src={Mapbef}/>
                </div>
                 :
                 <div onClick={() => {navigate('/map');}} style={{position:'absolute', top:'700px', left :'20px'}}>
                    <div id="course-button">
                        <div id="course-button-text">코스 추천받기</div>
                    </div>
                 </div>
            }
        </div>
    </div>
  );
};
  
  export default NavTheme;