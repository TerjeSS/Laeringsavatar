import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { FormTextArea } from "../lib/formTextArea";
import { ArticlesApiContext } from "../articlesApiContext";

export function AddNewArticle() {
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

  return (
    <form onSubmit={handleSubmit}>
      <div id={"back_link"}>
        <Link to={"/profile"}>Tilbake</Link>
      </div>
      <h1>Add new article</h1>
      <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
      <FormInput label={"Year:"} value={date} onChangeValue={setDate} />
      <FormInput label={"Author:"} value={author} onChangeValue={setAuthor} />
      <FormInput label={"Topic:"} value={topic} onChangeValue={setTopic} />
      <br />
      <FormTextArea
        label={"Article text:"}
        value={articletext}
        setValue={setArticletext}
      />
      <br />

      <p>Title, topic and article text must be filled out!</p>
      <div>
        <button
          disabled={
            title.length === 0 || topic.length === 0 || articletext.length === 0
          }
        >
          Save
        </button>
      </div>
    </form>
  );
}
