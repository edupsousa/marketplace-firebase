import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import "./assets/index.css";
import NovoAnuncioPage from "./pages/NovoAnuncioPage";
import MeusAnunciosPage from "./pages/MeusAnunciosPage";
import MensagensPage from "./pages/MensagensPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="meus-anuncios">
              <Route path="lista" element={<MeusAnunciosPage />} />
              <Route path="novo" element={<NovoAnuncioPage />} />
            </Route>
            <Route path="mensagens">
              <Route path=":idAnuncio" element={<MensagensPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
