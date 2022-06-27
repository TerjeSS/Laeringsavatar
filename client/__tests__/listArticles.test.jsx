import { ListArticles } from "../pages/listArticles";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ArticlesApiContext } from "../articlesApiContext";

describe("ListArticles component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListArticles />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows articles", async () => {
    const articles = [{ topic: "topic 1" }, { topic: "topic 2" }];
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <ArticlesApiContext.Provider value={{ listArticles: () => articles }}>
          <ListArticles />
        </ArticlesApiContext.Provider>,
        domElement
      );
    });

    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["topic 1", "topic 2"]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows error message", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      const listArticles = () => {
        throw new Error("Something went wrong");
      };
      ReactDOM.render(
        <ArticlesApiContext.Provider value={{ listArticles }}>
          <ListArticles />
        </ArticlesApiContext.Provider>,
        domElement
      );
    });

    expect(domElement.querySelector("#error-text").innerHTML).toEqual(
      "Error: Something went wrong"
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
