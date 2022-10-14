import { Routes, Route, Link, NavLink } from "react-router-dom";
import Login from "./pages/Login/login";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Embedded from "./pages/Embedded/Embedded";
import CopyPaste from "./CopyPaste";
import { React, useState } from "react";

function Wrapper(props) {
  return <canvas className="canvas">{props.content}</canvas>;
}
function LayoutComponent({ showCanvas, mainContent }) {
  if (!showCanvas) {
    return (
      <>
        <div className="home-container">
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
              <li>"Dansestudio"</li>
              <ul>
                <li>
                  <Link to={"/animation"}>"Gymsal"</Link>
                </li>
                <li>
                  <Link to={"/animation"}>"Gymsal"</Link>
                </li>
              </ul>
              <li>Add file</li>

              <ul>
                <li>Profile</li>
                <li>Edit profile</li>
                <li>Log out</li>
              </ul>
            </ul>
          </div>
          <div className="right-container">{mainContent}</div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="home-container">
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
            <li>"Dansestudio"</li>
            <ul>
              <li>
                <Link to={"/animation"}>"Gymsal"</Link>
              </li>
              <li>
                <Link to={"/animation"}>"Gymsal"</Link>
              </li>
            </ul>
            <li>Add file</li>

            <ul>
              <li>Profile</li>
              <li>Edit profile</li>
              <li>Log out</li>
            </ul>
          </ul>
        </div>
        <div className="right-container">
          <Wrapper content={mainContent} />
        </div>
      </div>
    </>
  );
}

function App() {
  const [showCanvas, setShowCanvas] = useState(true);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/embedded"
          element={<LayoutComponent mainContent={<Embedded />} />}
        />
        <Route
          path="/home"
          element={
            <LayoutComponent
              mainContent={<h2>Velkommen til 3D visualisering</h2>}
            />
          }
        />
        <Route
          path="/animation"
          element={
            <LayoutComponent
              mainContent={<CopyPaste />}
              showCanvas={showCanvas}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
