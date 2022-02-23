import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import Widget from "../../components/Widget";

export default function Rate(props: any) {
  return (
    <Widget sx={props.sx} >
      <Box
        sx={{
          position: "absolute",
          fontSize: "6rem",
          left: "calc(50% - 48px)",
          top: "-48px"
        }}>
        <StarIcon
          fontSize="inherit"
          style={{ color: "#c48515" }}
        />
        <Typography sx={{ fontSize: "24px", position: "absolute", left: "8px", top: "32px", width: "80px", margin: "auto" }}>
          {props.rating == null ? "?" : props.rating}
        </Typography>
      </Box>

      <Typography sx={{
        mt: 3,
        mb: 2,
        fontSize: "18px"
      }}>
        Oceń grę
      </Typography>
      <Rating
        sx={{
          fontSize:
          {
            xs: "1.6rem",
            sm: "2rem",
            md: "1.5rem",
            lg: "1.8rem",
            xl: "1.9rem"
          },
        }}
        onChange={(e, newValue) => {
          props.setRating(newValue);
        }}
        size="large"
        max={10}
        icon={<StarIcon style={{ color: "#c48515" }} fontSize="inherit" />}
        emptyIcon={<StarIcon style={{ color: "#1c1327", filter: "brightness(200%)", opacity:"0.8" }} fontSize="inherit" />} />
    </Widget>
  )
}