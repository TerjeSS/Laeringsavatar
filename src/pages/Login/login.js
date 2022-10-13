import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
// Import the functions you need from the SDKs you need
import { initializeApp, registerVersion } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import LogInForm from "../../components/Login/LogInForm";
import Register from "../../components/Register/RegisterForm";
//Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEIBPJigWsBvPAviXEetsbs1-sWVkQyvM",
  authDomain: "laringsavatar.firebaseapp.com",
  projectId: "laringsavatar",
  storageBucket: "laringsavatar.appspot.com",
  messagingSenderId: "1097221338853",
  appId: "1:1097221338853:web:d130ef55309de10b2cc60c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");

function lert() {
  alert();
}
const Login = () => {
  //States

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //Login function
  const loginWithEmail = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, username, password);
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log({ error });
      setError(error);
    }
  };

  const createUserWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  return (
    <div className="login-container">
      <div className="login-left-container">
        <div className="left-image-container">
          <img
            src="https://khio.no/system/images/W1siZiIsIjIwMjAvMDUvMjYvN2NoZHc4MzEzdl9iaWxkZV8zLmpwZyJdLFsicCIsInRodW1iIiwiMTAyNHhcdTAwM2UiXSxbInAiLCJlbmNvZGUiLCJ3ZWJwIiwiLXF1YWxpdHkgODUiXV0/bilde%203.webp"
            alt="dancing"
          />
        </div>
      </div>
      <div className="login-right-container">
        {!showCreateUser ? (
          <LogInForm
            lert={lert}
            userName={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loginWithEmail={loginWithEmail}
            setShowCreateUser={setShowCreateUser}
            error={error}
          ></LogInForm>
        ) : (
          <>
            <Register
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPassword={setPassword}
              setEmail={setEmail}
              createUserWithEmail={createUserWithEmail}
              setShowCreateUser={setShowCreateUser}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
