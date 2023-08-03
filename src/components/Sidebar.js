import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../resources/firebase";

const SideNavBar = () => {
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    var btn = document.querySelector(".logoutBtn");
    if (user) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="left-menu-container">
      <div className="sidebar-links-container">
        <Link to={"/home"}>Hjem</Link>
        <Link to={"/faq"}>Hjelp</Link>
      </div>

      <button class="logoutBtn" onClick={() => handleLogout()}>Logg ut</button>
    </div>
  );
};
export default SideNavBar;
