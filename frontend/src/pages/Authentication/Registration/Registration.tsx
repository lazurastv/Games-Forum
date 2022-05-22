import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSessionContext } from '../../../components/Authentication/SessionContext';

export default function Registration() {
  const { register } = useSessionContext();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const username = data.get('username') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    console.log([username, email, password].join(', '));
    register(username, email, password).catch(err => console.error(err));
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
            Rejestracja
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nazwa Użytkownika"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adres Email"
                  name="email"
                  autoComplete="email"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Potwierdź Hasło"
                  type="password"
                  id="password2"
                  autoComplete="confirm-password"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="secondary" />
                  }
                  label="Akceptuje regulamin forum itd..."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Zarejestruj się
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Box
                  component={Link}
                  to="/logowanie"
                  sx={{ color: "text.secondary" }}
                >
                  Masz już konto? Zaloguj się
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}