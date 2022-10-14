import React from "react";
import { Link } from "react-router-dom";
import "./Embedded.css";

const Embedded = () => {
  return (
    <>
      <div className="embedded-container">
        <h3>Visning av to testfiler for </h3>
        <div>
          <iframe
            src="https://egms-my.sharepoint.com/personal/heli011_egms_no/_layouts/15/embed.aspx?UniqueId=c47c0f8a-3308-47ce-8a5f-a313a684ebeb"
            frameBorder=""
            scrolling="yes"
            height="100%"
            width="100%"
            allowFullScreen
            title="P1_Roll_Down0001_max.glb"
            name="P1_Roll_Down0001_max.glb"
          ></iframe>
        </div>
        <div>
          <iframe
            src="https://egms-my.sharepoint.com/personal/heli011_egms_no/_layouts/15/embed.aspx?UniqueId=4dd749b5-d7e6-4b50-b5f9-57459c1b88c6"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            title="P2_Jord0001_max.glb"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Embedded;
