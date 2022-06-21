import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Register } from "./pages/register/register";
import { UserPage } from "./pages/userPage/userPage";
import { ViewFiles } from "./pages/viewFiles/viewFiles";

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/userpage"} element={<UserPage />} />
        <Route path={"/viewfiles"} element={<ViewFiles />} />
      </Routes>
    </BrowserRouter>
  );
}
