import {Typography } from "@mui/material";
import { TileImage, TileShadow, TileText } from "./Tile";

export default function HeaderTile(props: any) {
  return (
    <TileShadow
      shadow="linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent)"
      sx={{
        position: "relative",
        height: "65vh",
        mb: 8,
      }}
    >
      <TileImage src={props.imgSrc}/>
      <TileText>
        <Typography
          sx={{
            fontSize: "42px",
            fontWeight: 500,
            textAlign: "center",
            textShadow: `3px 4px 7px rgba(0,0,0,0.4)`,
            mb: 3,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: "18px",
            fontWeight: 200,
            color:"staticText.secondary"
          }}
        >
          {props.caption}
        </Typography>
      </TileText>
    </TileShadow>
  );
}
