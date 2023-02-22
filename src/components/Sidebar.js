import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../resources/firebase";
import { useState } from "react";

const SideNavBar = () => {
  const [buttonText, setButtonText] = useState("");
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setButtonText("Logg ut");
    } else {
      setButtonText("Logg in");
    }
  });

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="left-menu-container">
      <Link to={"/home"}>Hjem</Link>

      <button onClick={() => handleLogout()}>{buttonText}</button>
    </div>
  );
};
export default SideNavBar;
