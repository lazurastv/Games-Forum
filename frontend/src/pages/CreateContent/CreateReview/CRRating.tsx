import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
const starFonSize = {
  xs: "2rem",
  md: "2.2rem",
  lg: "2.5rem",
};
export default function CRRating(props: any) {
  return (
    <Box sx={{ ...props.sx }}>
      <Typography sx={{ mb: 0.5, fontSize: "24px" }}>
        Twoja ocena:
        <Typography
          component="span"
          sx={{ color: "secondary.main", fontSize: "30px" }}
        >
          {" "}
          {props.rating === null ? "?" : props.rating}/10
        </Typography>
      </Typography>
      <Rating
        sx={{ fontSize: starFonSize }}
        onChange={(e, newValue) => {
          props.setRating(newValue);
        }}
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
    </Box>
  );
}
