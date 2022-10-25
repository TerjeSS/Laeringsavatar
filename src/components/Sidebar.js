import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../resources/firebase";

const SideNavBar = () => {
  return (
    <div>
      <div className="left-menu-container">
        <ul className="list-container">
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/embedded"}>Lærerstudenter demo</Link>
          </li>
        </ul>
        <ul>
          <li>"Dansestudio"</li>
          <ul className="studio-links">
            <li>
              <Link to={"/animation1"}>P1_Roll_Down</Link>
            </li>
            <li>
              <Link to={"/animation2"}>P2_JorD</Link>
            </li>
          </ul>
        </ul>

        <ul>
          <li>Add file</li>
          <li>Profile</li>
          <li>Edit profile</li>
          <li>Log out</li>
        </ul>
        {auth.currentUser && <div>Logged in as {auth.currentUser.email}</div>}
      </div>
    </div>
  );
};
export default SideNavBar;
