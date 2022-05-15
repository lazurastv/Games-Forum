import { Box } from "@mui/system";
import React from "react";

export default function Error() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}
    >
      {"Nie udało się załadować strony :("}
    </Box>
  );
}
