import React from "react";

export function UserPage() {
  return (
    <div>
      <h1>Brukerside for lærerstudent</h1>
      <input placeholder="Navn" /> <br />
      <input placeholder="Skole" /> <br />
      <input placeholder="Praksis" /> <br />
      <button>Legg til fil</button> <br />
      <button>Publiser</button>
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
