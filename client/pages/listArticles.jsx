import React, { useContext } from "react";
import { useLoading } from "../useLoading";
import { ArticlesApiContext } from "../articlesApiContext";

function ArticleCard({
  article: { title, date, author, poster, topic, articletext },
}) {
  return (
    <>
      <div id={"article_card_info"}>
        <h1>Navn: {title}</h1>
        <h3>Skole: {topic}</h3>
        <h3>Sted: {author}</h3>
        <img src={poster} alt="Fil" width={300} height={200} />
      </div>
    </>
  );
}

export function ListArticles() {
  const { listArticles } = useContext(ArticlesApiContext);
  const { loading, error, data } = useLoading(listArticles);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      {data.map((article) => (
        <ArticleCard key={article.topic} article={article} />
      ))}
    </div>
  );
}
