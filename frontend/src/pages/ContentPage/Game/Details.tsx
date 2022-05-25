import { Typography } from "@mui/material";
import Widget from "../../../components/Widget";
const Detail = (props: any) => (
  <Typography sx={{
    fontSize: "18px",
    textAlign: "left",
    mt: 2,
  }}>
    <Typography component="span" sx={{
      minWidth:"120px",
      display:"inline-block",
      color: "text.secondary",
      fontWeight: "300",
      mr: 1 
    }}>
      {props.label}
    </Typography>
    <Typography component="span">
      {props.children}
    </Typography>
  </Typography >
)
export default function Details(props: any) {
  return (
    <Widget sx={props.sx} >
      <Typography sx={{
        fontSize: "20px",
        mb: 2,
        textAlign: "left"
      }}>
        Szczegóły
      </Typography>
      <Detail label="Producent:">
        {props.developer}
      </Detail>
      {/* <Detail label="Wydawca:">
        {props.publisher}
      </Detail> */}
      <Detail label="Data premiery:">
        {props.date}
      </Detail>
    </Widget>
  )
}