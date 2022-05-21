import { Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
const tabPaths = ["/artykuly", "/recenzje", "/gry", "/chat"];
export default function NavigationTabs() {
  let location = useLocation();
  const getValue = () => {
    if (tabPaths.includes(location.pathname)) {
      switch (location.pathname) {
        case "/artykuly":
          return 0;
        case "/recenzje":
          return 1;
        case "/gry":
          return 2;
        case "/chat":
          return 3;
      }
    }
    return false;
  };
  return (
    <Tabs indicatorColor="secondary" textColor="secondary" variant="fullWidth" value={getValue()} sx={{ mx: 0 }}>
      <Tab label="Artykuły" to="/artykuly" component={Link} />
      <Tab label="Recenzje" to="/recenzje" component={Link} />
      <Tab label="Gry" to="/gry" component={Link} />
      <Tab label="Chat" to="/chat" component={Link} />
    </Tabs>
  );
}
