import React from "react";

import { Box, useTheme } from "@mui/system";

export default function HoverableItem(props: any) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position:"relative",
        color: "text.primary",
        backgroundColor: "primary.main",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 2,
        mt: 2,
        "&:hover": {
          filter: theme.palette.mode === "light" ? "brightness(105%)" : "brightness(120%)",
          cursor: "pointer",
          color: "secondary.main",
        },
        transition: "all 0.3s ease-in-out",
        flex: 1,
      }}
    >
      {props.children}
    </Box>
  );
}
