import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Widget from "./Widget";
export default function Author({ authorData, sx }) {
  return (
    <Widget sx={sx}>
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
        <Avatar sx={{ mr: 1 }}>{authorData.profilePicturePath}</Avatar>
        <Typography
          sx={{
            fontSize: "18px",
            mb: 1,
            textAlign: "left",
          }}
        >
          {authorData.name}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "primary.main" }} />
      <Typography
        sx={{
          fontSize: "16px",
          textAlign: "left",
          mt: 2,
        }}
      >
        {authorData.shortDescription}
      </Typography>
    </Widget>
  );
}
