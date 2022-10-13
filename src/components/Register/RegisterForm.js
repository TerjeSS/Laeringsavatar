import React, { useState } from "react";
const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  setShowCreateUser,
  createUserWithEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
}) => {
  // const {
  //   username,
  //   setUsername,
  //   password,
  //   setPassword,
  //   setShowCreateUser,
  //   createUserWithEmail,
  //   firstName,
  //   setFirstName,
  //   lastName,
  //   setLastName,
  //   email,
  //   setEmail,
  // } = props;
  return (
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
          setShowCreateUser(false);
        }}
      >
        Har du allerede bruker? Logg inn her
      </div>
    </>
  );
};

export default Register;
