import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { LoginPage } from "../pages/loginPage";
import { ArticlesApiContext } from "../articlesApiContext";
import { MemoryRouter } from "react-router-dom";

describe("login page", () => {
  it("redirect to log in with google", async () => {
    // replace window.location to be able to detect redirects
    const location = new URL("https://www.example.com");
    delete window.location;
    window.location = new URL(location);

    const authorization_endpoint = `https://foo.example.com/auth`;
    const client_id = `1016355980496-2lk038m45cigv7pbqnm0jl9qokodiel6.apps.googleusercontent.com`;

    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginPage
          config={{
            google: { authorization_endpoint, client_id },
          }}
        />
      </MemoryRouter>,
      domElement
    );
    await act(async () => {
      await Simulate.click(domElement.querySelector("button"));
    });
    const redirect_uri = `${location.origin}/login/google/callback`;
    expect(window.location.origin + window.location.pathname).toEqual(
      authorization_endpoint
    );
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search.substring(1))
    );
    expect(params).toMatchObject({ client_id, redirect_uri });
  });
});

it("posts received token to server", async () => {
  window.sessionStorage.setItem("expected_state", "test");
  const access_token = `abc`;
  const location = new URL(
    `https://www.example.com#access_token=${access_token}&state=test`
  );
  delete window.location;
  window.location = new URL(location);

  const domElement = document.createElement("div");
  const registerLogin = jest.fn();
  const reload = jest.fn();
  act(() => {
    ReactDOM.render(
      <MemoryRouter initialEntries={["/google/callback"]}>
        <ArticlesApiContext.Provider value={{ registerLogin }}>
          <LoginPage reload={reload} />
        </ArticlesApiContext.Provider>
      </MemoryRouter>,
      domElement
    );
  });
  expect(registerLogin).toBeCalledWith("google", { access_token });
});
