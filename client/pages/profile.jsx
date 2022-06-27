import { useLoading } from "../useLoading";
import { Link } from "react-router-dom";
import { FrontPageArticleCard } from "./frontPageArticleCard";
import React, { useContext } from "react";
import { ArticlesApiContext } from "../articlesApiContext";
import { FormInput } from "../lib/formInput";
import { FormTextArea } from "../lib/formTextArea";

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { FormTextArea } from "../lib/formTextArea";
import { ArticlesApiContext } from "../articlesApiContext";

export function Profile({ user }) {
  const { listArticles } = useContext(ArticlesApiContext);
  const { loading, error, data } = useLoading(listArticles);
  const { createArticle } = useContext(ArticlesApiContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [articletext, setArticletext] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createArticle({ title, date: parseInt(date), author, topic, articletext });
    navigate("/articles");
  }

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
      <div id={"userinfo"}>
        <div>
          <h1 className={"googleName"}>{user.google.name}</h1>
        </div>
        <div>
          <h1 className={"googleEmail"}>{user.google.email}</h1>
        </div>
        <div>
          <img src={user.google.picture} alt={"Profile picture"} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Legg til </h1>
        <FormInput label={"Navn:"} value={title} onChangeValue={setTitle} />
        <FormInput label={""} value={date} onChangeValue={setDate} />
        <FormInput label={"Sted:"} value={author} onChangeValue={setAuthor} />
        <FormInput label={"Skole:"} value={topic} onChangeValue={setTopic} />
        <br />
        <FormTextArea
          label={"Legg til fil:"}
          value={articletext}
          setValue={setArticletext}
        />
        <br />

        <p>Alle felter må være fylt ut for å publisere!</p>
        <div>
          <button
            disabled={
              title.length === 0 ||
              topic.length === 0 ||
              articletext.length === 0
            }
          >
            Publiser
          </button>
          <br /> <Link to={"/articles"}>Filer</Link>
        </div>
      </form>
    </div>
  );
}
