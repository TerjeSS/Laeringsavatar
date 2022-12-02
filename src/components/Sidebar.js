import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../resources/firebase";

const SideNavBar = () => {
  var currentUser;
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
    } else {
      console.log("not logged in");
    }
  });

  const handleLogout = () => {
    auth.signOut();
    alert("logged out");
  };

  return (
    <div className="left-menu-container">
      <ul className="list-container">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to={"/embedded"}>Embedded test</Link>
        </li>
      </ul>
      <ul>
        <li>Bevegelsesmateriale</li>
        <ul className="studio-links">
          <li>
            <Link to={"/animation1"}>P1_Roll_Down</Link>
          </li>
          <li>
            <Link to={"/animation2"}>P2_JorD</Link>
          </li>
          <li>
            <Link to={"/animation3"}>Bare for test - 2</Link>
          </li>
          <li>
            <Link to={"/animation4"}>P3_Floor_Pattern</Link>
          </li>
          <li>
            <Link to={"/animation5"}>P4_Roll_FandB</Link>
          </li>
        </ul>
      </ul>

      <ul>
        <li>Add file</li>
        <li>Profile</li>
        <li>Edit profile</li>
        <li onClick={() => handleLogout()}>Log out</li>
      </ul>
      {currentUser && <div>Logged in as {currentUser.email}</div>}
    </div>
  );
};
export default SideNavBar;
