import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import Widget from "../../../components/Widget";
import { preProcessFile } from "typescript";
const Plus = (props: any) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <AddCircleOutlineIcon sx={{ mr: 1, color: green[500] }} />
    <Typography>{props.children}</Typography>
  </Box>
);
const Minus = (props: any) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <RemoveCircleOutlineIcon sx={{ mr: 1, color: red[500] }} />
    <Typography>{props.children}</Typography>
  </Box>
);
export default function ReviewRating({ sx, score, pluses, minuses }) {
  return (
    <Widget sx={{ ...sx, fontSize: "16px", textAlign: "left" }}>
      <Typography sx={{ fontSize: "24px", textAlign: "center" }}>
        Moja ocena:
        <Typography
          component="span"
          sx={{ fontSize: "30px", color: "secondary.main", fontWeight: 500 }}
        >
          {" "}
          {score}/10
        </Typography>
      </Typography>
      <Typography sx={{ mb: 1 }}>Zalety:</Typography>
      {pluses.map((v, idx) => (
        <Plus key={idx}>{v}</Plus>
      ))}
      <Typography sx={{ mb: 1 }}>Wady:</Typography>
      {minuses.map((v, idx) => (
        <Minus key={idx}>{v}</Minus>
      ))}
    </Widget>
  );
}
