import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/login";
import "./pages/Home.css";
import { React } from "react";
import SideNavBar from "./components/Sidebar";
import HomeScreen from "./pages/HomeScreen";
import AnimationScene from "./pages/AnimationScene";

function App() {
  const showCanvas = true;
  return (
    <>
      <Routes>
        <Route
          path="/visualisering/:filename"
          element={
            <LayoutComponent
              mainContent={<AnimationScene animationFilename="" />}
            />
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={<LayoutComponent mainContent={<HomeScreen />} />}
        />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
    </>
  );
}
const MainContent = (props) => {
  const { showCanvas } = props;
  // if (!showCanvas) {
  //   return <div className="right-container">{props.mainContent}</div>;
  // }
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

export default App;
