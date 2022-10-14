import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CopyPaste from "../../CopyPaste";
import Embedded from "../Embedded";
import "./Home.css";

const Home = () => {
  return (
    <>
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
              <button>Show animation</button>
            </ul>
          </ul>
        </div>
        <div className="right-container"></div>
      </div>
    </>
  );
};

export default Home;
