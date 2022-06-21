import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage/frontPage";
import { Register } from "./pages/register/register";

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
