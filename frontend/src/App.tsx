import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Games from "./pages/ContentList/Games/Games";
import Chat from "./pages/Chat";
import Login from "./pages/Authentication/Login/Login";
import Registration from "./pages/Authentication/Registration/Registration";
import Home from "./pages/Home/Home";
import Reviews from "./pages/ContentList/Reviews/Reviews";
import Game from "./pages/ContentPage/Game/Game";
import Article from "./pages/ContentPage/Article/Article";
import Review from "./pages/ContentPage/Review/Review";
import MyProfile from "./pages/Profile/MyProfile";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Authentication/ProtectedRoute";
import { useSessionContext } from "./components/Authentication/SessionContext";
import ScrollToTop from "./components/ScrollToTop";
import CreateArticle from "./pages/ContentCreate/CreateArticle/CreateArticle";
import CreateReview from "./pages/ContentCreate/CreateReview/CreateReview";
import CreateGame from "./pages/ContentCreate/CreateGame/CreateGame";
import Articles from "./pages/ContentList/Articles/Articles";
import NotFound from "./pages/Errors/NotFound";
import MyContent from "./pages/MyContent/MyContent";
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
            <Route path="wpisy" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MyContent />} />} />
            <Route path="artykuly" element={<Articles />} />
            <Route path="artykuly/:id" element={<Article />} />
            <Route path="recenzje" element={<Reviews />} />
            <Route path="recenzje/:id" element={<Review />} />
            <Route path="gry" element={<Games />} />
            <Route path="gry/:id" element={<Game />} />
            <Route path="chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Chat />} />} />
            <Route path="profil" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MyProfile />} />} />
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
