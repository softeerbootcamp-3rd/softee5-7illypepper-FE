import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"
import DefaultBackground from "../components/DefaultBackground";
import { useForm, FormProvider, Controller } from "react-hook-form";
import React, {useState} from 'react';
import ActivatedFeedback from "../components/ActivatedFeedback";
import DeactivatedFeedback from "../components/DeactivatedFeedback";
import actStar from "../assets/actStar.png";
import deactStar from "../assets/deactStar.png";

import crCourse from "../assets/courseReview/courseReview_course.png";
import crPic from "../assets/courseReview/courseReview_picture.png";
import crPicAct from "../assets/courseReview/courseReview_pic_act.png";
import crDog from "../assets/courseReview/courseReview_dog.png";
import crTrend from "../assets/courseReview/courseReview_trend.png";
import crMood from "../assets/courseReview/courseReview_mood.png";
import crView from "../assets/courseReview/courseReview_view.png";
import crCalm from "../assets/courseReview/courseReview_calm.png";
import crBright from "../assets/courseReview/courseReview_bright.png";
import crBaby from "../assets/courseReview/courseReview_baby.png";
import axios from "axios";

const EndCourse = () => {
    const navigate = useNavigate();
    const methods = useForm();
    const { watch, register, handleSubmit} = methods;
    const id = watch("id");
    const nickname = window.localStorage.getItem('nickname');

    const [rating, setRating] = useState(0);

    const [selCrPic, setSelCrPic] = useState(false);

    const onClickCrPic = () => {
        setSelCrPic(!selCrPic);
    }

    const handleStarClick = (index) => {
        setRating(index);
    }

    const onClickSendReview = async () => {
        const response = await axios.post('/course/rate', {
            memberId: 1,
            routeId: 1,
            score: rating
        });
        console.log("Post API - /course/rate: ", response.data);
    }

    return (
        <div>
            <DefaultBackground/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', position: 'absolute', top: '50px', left: '20px'}}>
                    <BackButton/>
                </div>
                <div style={{display: 'flex', position: 'absolute', top: '98px', left: '20px'}}>
                    <div id="login-text" style={{
                        fontFamily: 'Pretendard',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '30px',
                        color: 'var(--gray-1, #292929)'
                    }}>
                        <span style={{color: '#FF8058'}}>{nickname}</span>님,<br/>
                        추천해드린 코스는 어떠셨나요?
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '224px',
                    left: '76px'
                }}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <img
                            key={index}
                            src={index <= rating ? actStar : deactStar}
                            onClick={() => handleStarClick(index)}
                            alt={`star-${index}`}
                            style={{
                                cursor: 'pointer',
                                marginRight: index < 5 ? '2px' : '0px',
                                width: '40px',
                                height: '40px',
                                flexShrink: 0
                            }}
                        />
                    ))}
                </div>

                <div style={{
                    position: "absolute",
                    top: '330px',
                    left: '22px',
                    color: selCrPic ? 'var(--main_text, #FF6D3F)' : 'var(--gray_500, #949494)',
                    fontFamily: 'Pretendard',
                    fontSize: '14.292px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal'
                }}>
                    {selCrPic ? "1/5" : "0/5"}
                </div>

                <div style={{
                    position: "absolute",
                    top: '360px',
                    left: '20px'
                }}>
                    <div style={{
                        marginBottom: '14px'
                    }}>
                        <img
                            src={crCourse}
                            style={{
                                width: '161px',
                                height: '34px',
                                marginRight: '8px'
                            }}
                        />
                        <img
                            src={selCrPic ? crPicAct : crPic}
                            onClick={() => onClickCrPic()}
                            style={{
                                width: '140px',
                                height: '34px'
                            }}
                        />
                    </div>
                    <div style={{
                        marginBottom: '14px'
                    }}>
                        <img
                            src={crDog}
                            style={{
                                width: '201px',
                                height: '34px',
                                marginRight: '8px'
                            }}
                        />
                        <img
                            src={crTrend}
                            style={{
                                width: '109px',
                                height: '34px'
                            }}
                        />
                    </div>
                    <div style={{
                        marginBottom: '14px'
                    }}>
                        <img
                            src={crMood}
                            style={{
                                width: '176px',
                                height: '34px',
                                marginRight: '8px'
                            }}
                        />
                        <img
                            src={crView}
                            style={{
                                width: '137px',
                                height: '34px'
                            }}
                        />
                    </div>
                    <div style={{
                        marginBottom: '14px'
                    }}>
                        <img
                            src={crCalm}
                            style={{
                                width: '149px',
                                height: '34px',
                                marginRight: '8px'
                            }}
                        />
                        <img
                            src={crBright}
                            style={{
                                width: '125px',
                                height: '34px'
                            }}
                        />
                    </div>
                    <div>
                        <img
                            src={crBaby}
                            style={{
                                width: '176px',
                                height: '34px',
                                marginRight: '8px'
                            }}
                        />
                    </div>
                </div>

                {
                    rating > 0 ?
                        <div style={{position: 'absolute', top: '712px'}} onClick={() => {
                            console.log("star: ", rating);
                            onClickSendReview(rating);
                            navigate("/home");
                        }}>
                            <ActivatedFeedback/>
                        </div>
                        :
                        <div style={{position: 'absolute', top: '712px'}}>
                            <DeactivatedFeedback/>
                        </div>
                }
            </div>
        </div>
    )
        ;
};

export default EndCourse;