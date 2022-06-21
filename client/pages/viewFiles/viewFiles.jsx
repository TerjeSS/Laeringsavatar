import React from "react";

export function ViewFiles() {
  return (
    <div>
      <h1>Videoer</h1>

      <h3>Video 1</h3>
      <p>Navn: Marcus</p>
      <p>Skole: Høyskolen Kristiania</p>
      <p>Praksis: IT</p>
      <video
        height={"250px"}
        width={"100%"}
        id="background-video"
        autoPlay
        loop
        muted
        poster="https://assets.codepen.io/6093409/river.jpg"
      >
        <source
          src="https://assets.codepen.io/6093409/river.mp4"
          type="video/mp4"
        />
      </video>

      <h3>Video 2</h3>
      <p>Navn: Sucram</p>
      <p>Skole: Bekkenes Videregående</p>
      <p>Praksis: Dans</p>
      <video
        height={"250px"}
        width={"100%"}
        id="background-video"
        autoPlay
        loop
        muted
        poster="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif"
      >
        <source
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif"
          type="video/mp4"
        />
      </video>
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
