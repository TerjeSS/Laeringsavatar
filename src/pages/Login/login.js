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

const Login = () => {
  //States

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  //Login function
  const loginWithEmail = async () => {
    const res = await signInWithEmailAndPassword(auth, username, password);

    console.log(res);
    if (res.user.accessToken) {
      navigate("/home");
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
        {!createUser ? (
          <>
            <h2>Logg inn</h2>
            <div className="input-container">
              <label>Brukernavn</label>
              <input
                placeholder="ola@normann.no"
                value={username}
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log(username);
                }}
              />
            </div>
            <div className="input-container">
              <label>Passord</label>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="login-button-container">
              <button onClick={loginWithEmail} className="login-button">
                Logg inn
              </button>
            </div>
            <div>
              <b>eller</b>
            </div>
            <div className="google-button-container">
              <div className="google-button">
                <div>
                  <img
                    src="/img/googleIcon.png"
                    alt="google icon"
                    height="30 px"
                  />
                </div>
                <div>Logg inn med Google</div>
              </div>
            </div>

            <div
              className="register-link"
              onClick={() => {
                setCreateUser(true);
              }}
            >
              Har du ikke bruker? Registrer deg her
            </div>
          </>
        ) : (
          <>
            <h2>Opprett bruker</h2>
            <div className="input-container">
              <label>Fornavn</label>
              <input
                placeholder="Ola"
                value={firstName}
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <label>Etternavn</label>
              <input
                placeholder="Normann"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <label>E-post</label>
              <input
                placeholder="ola@normann.no"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <label>Passord</label>
              <input
                placeholder="******"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="login-button-container">
              <button onClick={createUserWithEmail} className="login-button">
                Opprett
              </button>
            </div>
            <div
              className="register-link"
              onClick={() => {
                setCreateUser(false);
              }}
            >
              Har du allerede bruker? Logg inn her
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
