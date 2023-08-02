import React from "react";
import "./ControlPanel.css";
const ControlPanel = () => {
  return (
    <div className="control-panel-container">
      <input type="checkbox" id="toggle-button" class="toggle-button"/>
      <label for="toggle-button" class="toggle-button"></label>
      <div class="prev-button"></div>
      <div class="next-button"></div>
      <div class="reset-button"></div>
    </div>
  );
};

export default ControlPanel;
