import { Typography } from "@mui/material";
import Widget from "../../components/Widget";
const Detail = (props: any) => (
  <Typography sx={{
    fontSize: "18px",
    textAlign: "left",
    mt: 2,
  }}>
    <Typography component="span" sx={{ fontWeight: "300" }}>
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
        fontSize: "18px",
        mb: 2,
      }}>
        Szczegóły
      </Typography>
      <Detail label="Producent: ">
        {props.producer}
      </Detail>
      <Detail label="Wydawca: ">
        {props.publisher}
      </Detail>
      <Detail label="Data premiery: ">
        {props.date}
      </Detail>
    </Widget>
  )
}