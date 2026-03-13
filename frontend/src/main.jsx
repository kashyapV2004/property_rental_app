import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {LoaderContextProvider} from "./context/LoaderContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <LoaderContextProvider>
        <App />
      </LoaderContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
);
