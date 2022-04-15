import { Divider, Typography } from "@mui/material";
import React from "react";

export default function SectionHeader(props: any) {
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "left", color: "secondary.main" }}
      >
        {props.children}
      </Typography>
      <Divider sx={{ mb: 4, borderColor: "secondary.main" }} />
    </React.Fragment>
  );
}
