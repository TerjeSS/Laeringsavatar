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
      <Link to={"/home"}>Hjem</Link>

      <button onClick={() => handleLogout()}>Logg ut</button>
    </div>
  );
};
export default SideNavBar;
