import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Embedded from "./pages/Embedded/Embedded";
import "./pages/Home.css";
import CopyPaste from "./pages/AnimationScene";
import { React } from "react";
import SideNavBar from "./components/Sidebar";
import HomeScreen from "./pages/HomeScreen";

const MainContent = (props) => {
  const { showCanvas } = props;
  if (!showCanvas) {
    return <div className="right-container">{props.mainContent}</div>;
  }
  return <div className="right-container">{props.mainContent}</div>;
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
  const showCanvas = true;
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
          element={<LayoutComponent mainContent={<HomeScreen />} />}
        />
        <Route
          path="/animation1"
          element={
            <LayoutComponent
              mainContent={<CopyPaste animationFilename="P1_Roll_Down.glb" />}
              showCanvas={showCanvas}
            />
          }
        />
        <Route
          path="/animation2"
          element={
            <LayoutComponent
              mainContent={<CopyPaste animationFilename="Jord.glb" />}
              showCanvas={showCanvas}
            />
          }
        />
        <Route
          path="/animation3"
          element={
            <LayoutComponent
              mainContent={<CopyPaste animationFilename="testFile.glb" />}
              showCanvas={showCanvas}
            />
          }
        />
        <Route
          path="/animation4"
          element={
            <LayoutComponent
              mainContent={
                <CopyPaste animationFilename="P3_Floor_Pattern.glb" />
              }
              showCanvas={showCanvas}
            />
          }
        />
        <Route
          path="/animation5"
          element={
            <LayoutComponent
              mainContent={<CopyPaste animationFilename="P4_Roll_FandB.glb" />}
              showCanvas={showCanvas}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
