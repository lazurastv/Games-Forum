import { Box } from "@mui/system";
import { Button, Link, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';

export default function AccountCreatedMessage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        gap: 1,
      }}
    >
      <Stack spacing={2}>
        <Typography sx={{ fontSize: 28 }}>Twoje konto zostało utworzone</Typography>
        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
            Na Twój adres e-mail został wysłany mail aktywacyjny.
            Prosimy o sprawdzenie poczty i dokonanie aktywacji konta
        </Box>
        <Button component={Link} to="/home">Kontynuuj</Button>
      </Stack>
    </Box>
  );
}