import { Routes, Route, Link, NavLink } from "react-router-dom";
import Login from "./pages/Login/login";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Embedded from "./pages/Embedded";
import CopyPaste from "./CopyPaste";

function LayoutComponent(props) {
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
              <NavLink to={"/animation"}>Avatars</NavLink>
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
        <div className="right-container">{props.mainContent}</div>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/embedded"
          element={<LayoutComponent mainContent={<Embedded />} />}
        />
        <Route path="/home" element={<LayoutComponent />} />
        <Route
          path="/animation"
          element={<LayoutComponent mainContent={<CopyPaste />} />}
        />
      </Routes>
    </>
  );
}

const helperContainer = ({ mainContent }) => {
  return <div className="right-container">{mainContent}</div>;
};

export default App;
