import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
// import Navbar from "./components/Navbar/Navbar";
import Embedded from "./pages/Embedded/Embedded";
import "./Home.css";
import CopyPaste from "./CopyPaste";
import { React, useState } from "react";
import SideNavBar from "./components/Sidebar";
import Animation2 from "./pages/Animation2";

const MainContent = (props) => {
  const { showCanvas } = props;
  if (!showCanvas) {
    return <div className="right-container">{props.mainContent}</div>;
  }
  return (
    //   <div className="right-container">
    //     <Wrapper mainContent={mainContent} />
    //   </div>
    <div className="right-container">{props.mainContent}</div>
  );
};

function LayoutComponent({ showCanvas, mainContent }) {
  return (
    <>
      <div className="home-container">
        <SideNavBar />
        <MainContent mainContent={mainContent} showCanvas={showCanvas} />
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
              mainContent={
                <div>
                  <h1>Velkommen til 3D visualisering prototype</h1>
                </div>
              }
            />
          }
        />
        <Route
          path="/animation1"
          element={
            <LayoutComponent
              mainContent={<CopyPaste />}
              showCanvas={showCanvas}
            />
          }
        />
        <Route
          path="/animation2"
          element={
            <LayoutComponent
              mainContent={<Animation2 />}
              showCanvas={showCanvas}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
