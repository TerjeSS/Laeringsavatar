import React from "react";
import "./ControlPanel.css";
const ControlPanel = () => {
  return (
    <div className="control-panel-container">
      <button className="pause-button">Pause</button>
      <button className="resume-button">Resume</button>
      <button className="reset-button">Reset</button>
      <label htmlFor="speed">Playback speed</label>
      <select name="speed" className="speed-selector" id="speed">
        <option value="1">1x</option>
        <option value="0.5">0.5x</option>
        <option value="0.25">0.25x</option>
      </select>
    </div>
  );
};

export default ControlPanel;
