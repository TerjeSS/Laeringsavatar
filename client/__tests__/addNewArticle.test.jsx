import { AddNewArticle } from "../pages/addNewArticle";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { ArticlesApiContext } from "../articlesApiContext";

describe("add article component", () => {
  it("shows articles form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddNewArticle />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Title:", "Year:", "Author:", "Topic:"]);
  });

  it("adds article on submit", () => {
    const createArticle = jest.fn();
    const title = "Test article";
    const element = document.createElement("div");
    ReactDOM.render(
      <ArticlesApiContext.Provider value={{ createArticle }}>
        <MemoryRouter>
          <AddNewArticle />
        </MemoryRouter>
      </ArticlesApiContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input input"), {
      target: { value: title },
    });
    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "Test article" },
    });
    Simulate.submit(element.querySelector("form"));
    expect(createArticle).toBeCalledWith({
      title,
      date: NaN,
      author: "",
      topic: "",
      articletext: "",
    });
  });
});
