import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export default function NavigationLogo() {
  return (
    <span>
      <Box
        component={Link}
        to="/"
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "flex" },
          color: "text.primary",
          textDecoration: "none",
        }}
      >
        <SportsEsportsIcon fontSize="large" />
        <Typography variant="h6" noWrap sx={{ ml: 1 }}>
          Forum graczy
        </Typography>
      </Box>
    </span>
  );
}
