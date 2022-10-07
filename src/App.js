import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function LayoutComponent(props) {
  return (
    <>
      <Navbar />
      {props.mainContent}
    </>
  );
}

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<LayoutComponent mainContent={<Home />} />}
        />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
