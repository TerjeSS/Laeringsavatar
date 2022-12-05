import { React, useState } from "react";

const LogInForm = (props) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    setError,
    setShowCreateUser,
    loginWithEmail,
    error,
    handleForgotPassword,
  } = props;

  return (
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
      {error && <div className="error-div">{error.toString()}</div>}
      <div className="login-button-container">
        <button onClick={loginWithEmail} className="login-button">
          Logg inn
        </button>
      </div>

      <div
        className="register-link"
        onClick={() => {
          setUsername("");
          setPassword("");
          setError("");
          setShowCreateUser(true);
        }}
      >
        Har du ikke bruker? Registrer deg her
      </div>
      <div className="forgot-password-link" onClick={handleForgotPassword}>
        Glemt passord? Klikk her for å resette
      </div>
    </>
  );
};

export default LogInForm;
