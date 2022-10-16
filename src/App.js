import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
// import Navbar from "./components/Navbar/Navbar";
import Embedded from "./pages/Embedded/Embedded";
import "./Home.css";
import CopyPaste from "./CopyPaste";
import { React, useState } from "react";
import SideNavBar from "./components/Sidebar";

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
