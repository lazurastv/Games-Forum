import React from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function NotFound() {
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
      <Typography sx={{ fontSize: 24 }}>Eror 404: Nie znaleziono strony</Typography>
    </Box>
  );
}
