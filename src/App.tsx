import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Authentication/ProtectedRoute";
import { useSessionContext } from "./components/Authentication/SessionContext";
import AccountConfirmedMessage from "./components/Errors/AccountConfirmedMessage";
import AccountCreatedMessage from "./components/Errors/AccountCreatedMessage";
import PageNotFoundError from "./components/Errors/PageNotFoundError";
import Navigation from "./components/Navigation/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import { useAlert } from "./hooks/useAlert";
import Login from "./pages/Authentication/Login/Login";
import Registration from "./pages/Authentication/Registration/Registration";
import Chat from "./pages/Chat/Chat";
import CreateArticle from "./pages/ContentCreate/CreateArticle/CreateArticle";
import CreateGame from "./pages/ContentCreate/CreateGame/CreateGame";
import CreateReview from "./pages/ContentCreate/CreateReview/CreateReview";
import Articles from "./pages/ContentList/Articles/Articles";
import Games from "./pages/ContentList/Games/Games";
import Reviews from "./pages/ContentList/Reviews/Reviews";
import Article from "./pages/ContentPage/Article/Article";
import Game from "./pages/ContentPage/Game/Game";
import Review from "./pages/ContentPage/Review/Review";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import UserContent from "./pages/UserContent/UserContent";
import Users from "./pages/UserList/Users";
import getTheme from "./theme";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  //theme
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const { alert } = useAlert();
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
    role: session.user?.role,
    authenticationPath: "/logowanie",
  };

  useEffect(() => { document.title = "Forum Graczy" }, []);

  return (
    <BrowserRouter basename="/Forum-Graczy">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <CssBaseline enableColorScheme />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dodaj" element={<ProtectedRoute {...defaultProtectedRouteProps} requiredRole="EDITOR" />}>
              <Route path="artykul" element={<CreateArticle />} />
              <Route path="artykul/:id" element={<CreateArticle />} />
              <Route path="recenzja" element={<CreateReview />} />
              <Route path="recenzja/:id" element={<CreateReview />} />
              <Route path="gra" element={<CreateGame />} />
              <Route path="gra/:id" element={<CreateGame />} />
            </Route>
            <Route
              path="wpisy/:userName"
              element={
                <ProtectedRoute {...defaultProtectedRouteProps} requiredRole="EDITOR" outlet={<UserContent />} />
              }
            />
            <Route path="artykuly" element={<Articles />} />
            <Route path="artykuly/:id" element={<Article />} />
            <Route path="recenzje" element={<Reviews />} />
            <Route path="recenzje/:id" element={<Review />} />
            <Route path="gry" element={<Games />} />
            <Route path="gry/:id" element={<Game />} />
            <Route path="chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Chat />} />} />
            <Route path="logowanie" element={<Login />} />
            <Route path="profil/:id" element={<Profile />} />
            <Route path="rejestracja" element={<Registration />} />
            <Route path="rejestracja/mail-powiadomienie" element={<AccountCreatedMessage />} />
            <Route path="rejestracja/mail-akceptacja/:token" element={<AccountConfirmedMessage />} />
            <Route path="uzytkownicy" element={<ProtectedRoute {...defaultProtectedRouteProps} requiredRole="ADMIN" outlet={<Users />} />} />
            <Route path="*" element={<PageNotFoundError />} />
          </Routes>
          {alert}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
