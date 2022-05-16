import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Navigation from "./components/Navigation";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import getTheme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import Games from "./pages/Games/Games";
import Chat from "./pages/Chat";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Home from "./pages/Home/Home";
import Reviews from "./pages/Reviews/Reviews";
import Game from "./pages/Game/Game";
import Article from "./pages/Article/Article";
import Review from "./pages/Review/Review";
import MyProfile from "./pages/Profile/MyProfile";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Authentication/ProtectedRoute";
import { useSessionContext } from "./components/Authentication/SessionContext";
import ScrollToTop from "./components/ScrollToTop";
import CreateArticle from "./pages/CreateContent/CreateArticle/CreateArticle";
import CreateReview from "./pages/CreateContent/CreateReview/CreateReview";
import CreateGame from "./pages/CreateContent/CreateGame/CreateGame";
import Articles from "./pages/Articles/Articles";
import NotFound from "./pages/Errors/NotFound";
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  //theme
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);
  //authentication redirects
  const { session } = useSessionContext();

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: !!session.isAuthenticated, // !! means if variable is null, it return false
    authenticationPath: "/logowanie",
  };

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <CssBaseline />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dodaj" element={<ProtectedRoute {...defaultProtectedRouteProps} />}>
              <Route path="artykul" element={<CreateArticle />} />
              <Route path="recenzja" element={<CreateReview />} />
              <Route path="gra" element={<CreateGame />} />
            </Route>
            <Route path="artykuly" element={<Articles />} />
            <Route path="artykuly/:id" element={<Article />} />
            <Route path="recenzje" element={<Reviews />} />
            <Route path="recenzje/:id" element={<Review />} />
            <Route path="gry" element={<Games />} />
            <Route path="gry/:id" element={<Game />} />
            <Route
              path="chat"
              element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Chat />} />}
            />
            <Route
              path="mojprofil"
              element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MyProfile />} />}
            />
            <Route path="logowanie" element={<Login />} />
            <Route path="profiletmp" element={<Profile />} />
            <Route path="rejestracja" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
