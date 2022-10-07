import React from "react";

const LogInForm = (props) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    setCreateUser,
    loginWithEmail,
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
            <img src="/img/googleIcon.png" alt="google icon" height="30 px" />
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
  );
};

export default LogInForm;
