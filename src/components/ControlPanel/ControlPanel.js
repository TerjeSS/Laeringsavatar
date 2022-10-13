import React from "react";
import "./ControlPanel.css";
const ControlPanel = ({ pauseAnimation, resumeAnimation }) => {
  return (
    <div className="control-panel-container">
      <button onClick={pauseAnimation}>Pause</button>
      <button onClick={resumeAnimation}>Play</button>
      <button>Reset</button>
    </div>
  );
};

export default ControlPanel;
