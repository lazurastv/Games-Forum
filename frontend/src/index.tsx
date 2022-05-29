import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { SessionContextProvider } from "./components/Authentication/SessionContext";
import { AlertProvider } from "./hooks/useAlert";

ReactDOM.render(
  // <React.StrictMode>
  <SessionContextProvider>
    <AlertProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </AlertProvider>
  </SessionContextProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);
