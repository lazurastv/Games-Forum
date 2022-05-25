import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}
