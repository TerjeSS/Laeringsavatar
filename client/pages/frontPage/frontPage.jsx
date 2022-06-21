import React from "react";
import { Link } from "react-router-dom";

export function FrontPage() {
  return (
    <div>
      <div className={"noob"}>
        <input placeholder="Brukernavn" /> <br />
        <input placeholder="Passord" /> <br />
        <button className={"button"}>Logg inn</button> <br />
        <Link to="/register">Opprett bruker</Link>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    * {
    text-align: center
    } `,
        }}
      />
    </div>
  );
}
