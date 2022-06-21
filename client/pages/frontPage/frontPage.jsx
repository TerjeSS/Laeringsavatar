import React from "react";
import { Link } from "react-router-dom";

export function FrontPage() {
  return (
    <div>
      <div>
        <h1>VisMa3D </h1>
        <input placeholder="Brukernavn" /> <br />
        <input type={"password"} placeholder="Passord" /> <br />
        <Link to="/userpage">
          <button className={"button"}>Logg inn</button> <br />
        </Link>
        <Link to="/register">Registrer deg her</Link> <br />
        <Link to="/viewfiles">Se videoene</Link>
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
