import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LoadingFailure() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}
    >
      <Typography sx={{ fontSize: 24 }}>Nie udało się załadować strony :(</Typography>
    </Box>
  );
}
