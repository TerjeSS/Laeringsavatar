import React from "react";
import "./ControlPanel.css";
const ControlPanel = () => {
  return (
    <div className="control-panel-container">
      <div class="prev-button"></div>
      <input type="checkbox" id="toggle-button" class="toggle-button"/>
      <label for="toggle-button" class="toggle-button"></label>
      <div class="next-button"></div>
      <div class="reset-button"></div>
      <div class="speed-container">
        <p>Hastighet:</p>
        <input type="range" min="0.5" max="2.0" step="0.1" id="speed-slider"></input>
      </div>
    </div>
  );
};

export default ControlPanel;
