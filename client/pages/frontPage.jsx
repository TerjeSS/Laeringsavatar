import React, { useContext } from "react";
import { ArticlesApiContext } from "../articlesApiContext";
import { useLoading } from "../useLoading";
import { Link } from "react-router-dom";

export function FrontPage() {
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
      <h1>VisMo3D</h1>
      <p>
        VisMo3D er lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <Link to={"/login"}>
        <h3>Logg inn</h3>
      </Link>
    </div>
  );
}
