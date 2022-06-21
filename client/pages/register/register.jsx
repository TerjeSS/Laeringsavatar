import { Link } from "react-router-dom";
import React from "react";

export function Register() {
  return (
    <div>
      <div>
        <h1>Registrer deg</h1>
        <input placeholder="Email" /> <br />
        <input type={"password"} placeholder="Passord" /> <br />
        <input type={"password"} placeholder="Gjenta passord" /> <br />
        <Link to="/">
          <button className={"button"}>Registrer</button> <br />
        </Link>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    * {
    text-align: center;
    margin: 2px;
    padding: 2px;
    } `,
        }}
      />
    </div>
  );
}
