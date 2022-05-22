import { Typography } from "@mui/material";

export default function Label(props: any) {
  return (
    <Typography
      sx={{
        fontSize: "20px",
        color: "text.secondary",
        textAlign: "left",
        mb: 0.5,
      }}
    >
      {props.children}
    </Typography>
  );
}
