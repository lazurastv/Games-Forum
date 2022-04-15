import { Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import Widget from "../../components/Widget";
const Plus = (props: any) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <AddCircleOutlineIcon sx={{ mr: 1, color: green[500] }} />
    <Typography>{props.children}</Typography>
  </Box>
)
const Minus = (props: any) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <RemoveCircleOutlineIcon sx={{ mr: 1, color: red[500] }} />
    <Typography >{props.children}</Typography>
  </Box>
)
export default function ReviewRating(props: any) {
  return (
    <Widget sx={{ ...props.sx, fontSize: "16px", textAlign: "left" }}>
      <Typography sx={{ fontSize: "24px", textAlign: "center"}}>
        Moja ocena:
        <Typography component="span" sx={{ fontSize: "30px",  color:"secondary.main" , fontWeight: 500 }}> 7/10</Typography>
      </Typography>
      <Typography sx={{ mb: 1 }}>Zalety:</Typography>
      <Plus>Lorem ipsum</Plus>
      <Plus>Lorem ipsum</Plus>
      <Plus>Lorem ipsum</Plus>
      <Plus>Lorem ipsum</Plus>
      <Plus>Lorem ipsum</Plus>
      <Typography sx={{ mb: 1 }}>Wady:</Typography>
      <Minus>Lorem ipsum</Minus>
      <Minus>Lorem ipsum</Minus>
      <Minus>Lorem ipsum</Minus>
      <Minus>Lorem ipsum</Minus>
    </Widget>
  )
}