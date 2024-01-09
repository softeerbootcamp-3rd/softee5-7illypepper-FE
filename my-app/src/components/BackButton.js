import { ReactComponent as ArrowLeft } from "../assets/ArrowLeft.svg";
import { useNavigate } from "react-router-dom";
import React from 'react';

const BackButton = () => {
    const navigate = useNavigate();
    return (
      <div onClick={() => {navigate(-1);}}>
        <ArrowLeft/>
      </div>
    );
  };
    
export default BackButton;