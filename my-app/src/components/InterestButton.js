import React from 'react';

const InterestButton = (props) => {
    const state = props.state;
    const text = props.text;
    const onPressed = props.onPressed;
    return (
        <div onClick = {() => {onPressed();}}>
            {
                state === 1 ?
                <div id="interest-card-empha">
                    <div id="interest-card-text-empha">{text}</div>
                </div>
                :
                <div id="interest-card">
                   <div id="interest-card-text">{text}</div>
                </div>
            }
        </div>
    );
  };
    
export default InterestButton;