import React from "react";
import './Progress.css';
const Progress = (props) => {
  return (
    <div className="progress">
      <div className="progress-in1" style={{borderColor:props.borderColor}}>{props.children}</div>
      <div className="progress-in2"></div>
    </div>
  );
};

export default Progress;
