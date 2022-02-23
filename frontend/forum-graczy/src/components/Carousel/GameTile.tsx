import { Box, Typography } from "@mui/material";
import Tile from "../Tile";
const Rating = (props: any) => (
  <Box sx={{
    ...props.sx,
    position: "absolute",
    right: "15px",
    width: "60px",
    height: "50px",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex:"100"
  }}>
    <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
      {props.children}
    </Typography>
  </Box>
)
export default function GameTile(props: any) {
  return (
    <Tile
      small
      src={props.src}
      title={props.title}
      caption={
        <Box
          sx={{
            width: "100%",
            textAlign: "left"
          }}
        >
          <div>CD-Project Red</div>
          <div>RPG, fabularna, science-fiction</div>
        </Box>
      }
    >
      <Rating sx={{
        top: "15px",
        color: "secondary.main"
      }}>
        10/10
      </Rating>
      <Rating sx={{
        top: "70px",
      }}>
        7.85
      </Rating>
    </Tile >
  );
}