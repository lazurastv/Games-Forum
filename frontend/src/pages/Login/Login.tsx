import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../../index.css";
import { GoogleIcon } from "../../assets/GoogleIcon";
import DividerWithText from "../../components/DividerWithText";
import { useNavigate, useLocation } from "react-router-dom";
import { useSessionContext } from "../../components/Authentication/SessionContext";

export default function Login() {
  const { login, session } = useSessionContext();
  const navigate = useNavigate();
  const location = useLocation();
  const hasPreviousState = location.key !== "default";
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log(session.isAuthenticated);
    if (email === "a@user.com" && password === "p") {
      login(email, password)
        .then(() => {
          //navigate(session.redirectPath);
          if (hasPreviousState) {
            navigate(-1);
          } else {
            navigate("/");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="login">
      <Container component="main" maxWidth="sm">
        <Box sx={{ p: { xs: 4, sm: 6, md: 6 } }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "primary.main",
            p: 5,
            borderRadius: "12px",
            boxShadow: 2,
            mb: { xs: 8, sm: 12, md: 16 },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              defaultValue="a@user.com"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adres Email"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
            />
            <TextField
              defaultValue="p"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
              color="secondary"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Zapamiętaj mnie"
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>
            <DividerWithText>Lub</DividerWithText>
            <Button
              disableElevation
              fullWidth
              size="large"
              variant="outlined"
              color="secondary"
              sx={{
                color: "text.primary",
                borderColor: "secondary.main",
                mt: 2,
              }}
            >
              <GoogleIcon />
              <Box sx={{ mr: 1 }}></Box>
              Zaloguj się kontem Google
            </Button>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs>
                <Box component={Link} to="/" sx={{ color: "text.secondary" }}>
                  Nie pamiętasz hasła?
                </Box>
              </Grid>
              <Grid item>
                <Box component={Link} to="/rejestracja" sx={{ color: "text.secondary" }}>
                  Nie masz konta? Zarejestruj się
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
