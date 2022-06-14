import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { confirmRegistration } from "../../fetchData/fetchUser";
import { useState } from "react";

export default function AccountConfirmedMessage() {
  let { token } = useParams();
  const [valid, setValid] = useState<boolean>(false);

  if (token !== undefined) {
    confirmRegistration(token).then(x => setValid(x === "Account activated"));
  }

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
        <Typography sx={{ fontSize: 28 }}>{valid ? "Twoje konto zostało aktywowane" : "Niepoprawny token"}</Typography>
        <Box>
          {valid ? "Gratulacje! Twoja rejestracja jest kompletna!" : "Sprawdź czy użyłeś poprawnego linka"}
        </Box>
        <Link to={`/`}>
          <Button sx={{ minWidth: "32px" }} size="large" variant="contained" color="secondary">
            Do strony głównej
          </Button>
        </Link>

      </Stack>
    </Box>
  );
}