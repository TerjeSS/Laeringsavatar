import React from "react";
import "./ControlPanel.css";
const ControlPanel = ({ pauseAnimation, resumeAnimation }) => {
  return (
    <div className="control-panel-container">
      <button className="pause-button" onClick={pauseAnimation}>
        Pause
      </button>
      <button className="resume-button" onClick={resumeAnimation}>
        Play
      </button>
      <button className="reset-button" disabled>
        Reset
      </button>
    </div>
  );
};

export default ControlPanel;
