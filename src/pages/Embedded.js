import React from "react";
import { Link } from "react-router-dom";

const Embedded = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="home-container">
        <div className="left-menu-container">
          <ul className="list-container">
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
            <li>
              <Link to={"/Embedded"}>Embedded test</Link>
            </li>
            <ul>
              <li>Avatars</li>
              <li>Motion Cap</li>
              <li>Add file</li>
            </ul>
            <li>Profile</li>
            <ul>
              <li>Edit profile</li>
              <li>Log out</li>
            </ul>
          </ul>
        </div>
        <div className="right-container">
          {/* <TestScene /> */}
          <iframe
            src="https://egms-my.sharepoint.com/personal/heli011_egms_no/_layouts/15/embed.aspx?UniqueId=4dd749b5-d7e6-4b50-b5f9-57459c1b88c6"
            frameborder="0"
            scrolling="no"
            height={"100%"}
            width={"100%"}
            allowfullscreen
            title="P2_Jord0001_max.glb"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Embedded;
