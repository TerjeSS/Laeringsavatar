import React from "react";
import "./ControlPanel.css";
const ControlPanel = () => {
  return (
    <div className="control-panel-container">
      <button className="pause-button">Pause</button>
      <button className="resume-button">Resume</button>
      <button className="reset-button">Reset</button>
      <button className="speed-button">2x Speed</button>
    </div>
  );
};

export default ControlPanel;
