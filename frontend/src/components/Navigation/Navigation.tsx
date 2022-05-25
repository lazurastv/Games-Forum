import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ThemeSwitch from "../../ThemeSwitch";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSessionContext } from "../Authentication/SessionContext";
import { Container } from "@mui/material";
import LoginButtons from "./components/LoginButtons";
import NavigationLogo from "./components/NavigationLogo";
import NavigationTabs from "./components/NavigationTabs";
import AccountButton from "./components/AccountButton";

const Navigation = () => {
  const theme = useTheme();
  const loginBreak = useMediaQuery(theme.breakpoints.up(970));
  const { session } = useSessionContext();
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs="auto" md="auto" sx={{ mr: 5 }}>
              <NavigationLogo />
            </Grid>
            <Grid item xs={12} sm={12} md="auto" order={{ xs: 3, sm: 3, md: 2 }}>
              <NavigationTabs />
            </Grid>
            <Grid item xs container justifyContent="flex-end" order={{ xs: 2, sm: 2, md: 3 }}>
              <Grid item xs="auto" md="auto">
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                  <ThemeSwitch />
                  {loginBreak ? (
                    session.isAuthenticated ? (
                      <AccountButton />
                    ) : (
                      <LoginButtons />
                    )
                  ) : (
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                      <AccountButton />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navigation;
