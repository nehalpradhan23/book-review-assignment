import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </GlobalContextProvider>
);
