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
            fontSize: "42px",
            fontWeight: 500,
            textShadow: `3px 4px 7px rgba(0,0,0,0.4)`,
            mb: 3
          }}
        >
          Cyberpunk 2077
        </Typography>
        <Typography
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: 200,
            width: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
              CD-Project Red
            </Grid>
            <Grid item xs={12} sm={4} sx={{
              textAlign:
              {
                xs: "left",
                sm: "center"
              }
            }}>
              RPG, fabularna, science-fiction
            </Grid>
            <Grid item xs={12} sm={4} sx={{
              textAlign:
              {
                xs: "left",
                sm: "right  "
              }
            }}>
              Ocena redakcji: 7/10
            </Grid>
          </Grid>
        </Typography>
      </TileText>
    </TileShadow>
  )
}