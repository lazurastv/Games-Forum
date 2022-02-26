import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
            textAlign: "center",
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
          <Grid container spacing={2} sx={{ color: "text.secondary" }}>
            <Grid item xs={12} md={4} sx={{ textAlign: "left", marginTop: "auto" }}>
              CD-Project Red
            </Grid>
            <Grid item xs={12} md={4} sx={{
              textAlign:
              {
                xs: "left",
                md: "center"
              },
              marginTop: "auto"
            }}>
              RPG, fabularna, science-fiction
            </Grid>
            <Grid item xs={12} md={4} sx={{
              textAlign:
              {
                xs: "left",
                md: "right"
              },
              color: "text.primary",
              marginTop: "auto"
            }}>

              <Box>
                Ocena redakcji:
                <Typography sx={{
                  color: "secondary.main",
                  fontSize: "24px",
                  fontWeight: 700,
                  display: "inline-block",
                  py: 1,
                  px: 1.5,
                  ml: 1,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: "10px",
                }}>
                  7/10
                </Typography>
              </Box>
              <Box>
                Ocena użytkowników:
                <Typography sx={{
                  color: "text.primary",
                  fontSize: "24px",
                  fontWeight: 700,
                  display: "inline-block",
                  py: 1,
                  px: 1.5,
                  ml: 1,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: "10px",
                }}>
                  8.24
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Typography>
      </TileText>
    </TileShadow>
  )
}