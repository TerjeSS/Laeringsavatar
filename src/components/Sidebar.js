import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../resources/firebase";

const SideNavBar = () => {
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
    }
  });

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
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
        <li onClick={() => handleLogout()}>Log out</li>
      </ul>
    </div>
  );
};
export default SideNavBar;
