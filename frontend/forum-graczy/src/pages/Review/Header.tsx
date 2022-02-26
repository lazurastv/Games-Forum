import { Grid, Typography } from "@mui/material";
import { TileImage, TileShadow, TileText } from "../../components/Tile";

export default function Header(props: any) {
  return (
    <TileShadow
      shadow="linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent)"
      sx={{
        position: "relative",
        height: "65vh",
        mb: 8,
      }}>
      <TileImage src='https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg' />
      <TileText >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: 500,
            textShadow: `3px 4px 7px rgba(0,0,0,0.4)`,
            mb: 3
          }}
        >
          Recenzja gry Cyberpunk 2077 - czy to najlepsza gra roku?
        </Typography>
        <Typography
          component="div"
          sx={{
            color: "text.secondary",
            textAlign: "right",
            fontSize: "18px",
            fontWeight: 300,
          }}
        >
          01.01.2022
        </Typography>
      </TileText>
    </TileShadow>
  )
}