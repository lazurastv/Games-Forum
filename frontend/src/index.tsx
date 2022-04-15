import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { SessionContextProvider } from "./components/Authentication/SessionContext";

ReactDOM.render(
  <React.StrictMode>
    <SessionContextProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </SessionContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

