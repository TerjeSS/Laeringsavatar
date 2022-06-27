import React from "react";

export function FrontPageArticleCard({ article: { title, topic, poster } }) {
  return (
    <>
      <div id={"article_card_info"}>
        <h1>{title}</h1>
        <h3>{topic}</h3>
        <img src={poster} alt="Fil" width={300} height={200} />
      </div>
    </>
  );
}
