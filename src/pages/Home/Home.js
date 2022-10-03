import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TestScene from "../TestScene/TestScene";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="left-menu-container">
          <ul className="list-container">
            <li>Home</li>
            <li>Avatar</li>
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
          <TestScene />
        </div>
      </div>
    </>
  );
};

export default Home;
