import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"
import DefaultBackground from "../components/DefaultBackground";
import { useForm, FormProvider, Controller } from "react-hook-form";
import React, {useState} from 'react';
import ActivatedFeedback from "../components/ActivatedFeedback";
import DeactivatedFeedback from "../components/DeactivatedFeedback";

const EndCourse = () => {
    const navigate = useNavigate();
    const methods = useForm();
    const { watch, register, handleSubmit} = methods;
    const id = watch("id");

    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index);
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
                        <span style={{color: '#FF8058'}}>{localStorage.getItem('id')}</span>님,<br/>
                        추천해드린 코스는 어떠셨나요?
                    </div>
                </div>

                <div style={{display: 'flex', position: 'absolute', top: '209px', left: '20px'}}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <span key={index} onClick={() => handleStarClick(index)}>
                            {index <= rating ? '★' : '☆'}
                        </span>
                    ))}
                </div>

                {
                    rating === 0 ?
                        <div style={{position: 'absolute', top: '712px'}}>
                            <DeactivatedFeedback/>
                        </div>
                        :
                        <div style={{position: 'absolute', top: '712px'}} onClick={() => {
                            navigate("/map");
                        }}>
                            <ActivatedFeedback/>
                        </div>
                }
            </div>
        </div>
    );
};

export default EndCourse;