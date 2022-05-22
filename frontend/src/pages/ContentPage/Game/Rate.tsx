import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import Widget from "../../../components/Widget";
const starFonSize = {
  xs: "clamp(1.5rem, 8vw, 3rem)",
  md: "clamp(1.2rem, 2.8vw, 2.1rem)",
};
export default function Rate(props: any) {
  return (
    <Widget sx={{ ...props.sx, textAlign: "center", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          fontSize: "6rem",
          left: "calc(50% - 48px)",
          top: "-65px",
        }}
      >
        <StarIcon fontSize="inherit" color="secondary" />
        <Typography
          sx={{
            color: "staticText.primary",
            fontSize: "24px",
            position: "absolute",
            left: "7px",
            top: "46px",
            width: "80px",
            margin: "auto",
          }}
        >
          {props.rating == null ? "?" : props.rating}
        </Typography>
      </Box>

      <Typography
        sx={{
          mt: 3,
          mb: 2,
          fontSize: "20px",
        }}
      >
        Oceń grę
      </Typography>
      <Rating
        sx={{
          fontSize: starFonSize,
        }}
        value={props.rating}
        onChange={(e, newValue) => props.setRating(newValue)}
        size="large"
        max={10}
        icon={<StarIcon color="secondary" fontSize="inherit" />}
        emptyIcon={
          <StarIcon
            style={{
              color: "#1c1327",
              filter: "brightness(200%)",
              opacity: "0.8",
            }}
            fontSize="inherit"
          />
        }
      />
    </Widget>
  );
}
