import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function LoginButtons() {
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <Button component={Link} to="logowanie" sx={{ color: "text.primary" }}>
        Logowanie
      </Button>
      <Typography variant="h6" component="div" sx={{ mx: 0.5, color: "text.primary" }}>
        |
      </Typography>
      <Button component={Link} to="rejestracja" sx={{ color: "text.primary" }}>
        Rejestracja
      </Button>
    </Box>
  );
}
