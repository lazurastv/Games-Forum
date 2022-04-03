import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Widget from "../../components/Widget";
export default function Author(props: any) {
  return (
    <Widget sx={props.sx} >
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
        <Avatar sx={{ mr: 1 }}>A</Avatar>
        <Typography
          sx={{
            fontSize: "18px",
            mb: 1,
            textAlign: "left"
          }}>
          Autor Autorowski
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "primary.main" }} />
      <Typography sx={{
        fontSize: "16px",
        textAlign: "left",
        mt: 2,
      }}>
        Bezpieczną przystań znalazłem na
        redakcyjnych social mediach – jeśli
        widzicie tam jakieś głupie rzeczy, to
        możecie być pewni, że jestem za nie
        odpowiedzialny. Za te mniej głupie też.
      </Typography >
    </Widget>
  )
}