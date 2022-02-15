import React from 'react';
import  Navigation from "./Navigation"
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import getTheme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Link, BrowserRouter,} from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Reviews from "./pages/Reviews";
import Games from "./pages/Games";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
     getTheme(mode),
    [mode],
  );

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Navigation/>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="artykuly" element={<Articles />} />
            <Route path="recenzje" element={<Reviews />} />
            <Route path="gry" element={<Games />} />
            <Route path="chat" element={<Chat />} />
            <Route path="logowanie" element={<Login />} />
            <Route path="rejestracja" element={<Registration />} />
          </Routes> 
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
