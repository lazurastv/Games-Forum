import { Box, Grid, useMediaQuery } from "@mui/material";
import Carousel from "../../components/Carousel/Carousel";
import ArticleTile from "../../components/Tile/ArticleTile";
import { useTheme } from "@mui/material/styles";

export default function TopNews() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box className="TopNews" sx={{ mb: 4 }}>
      {matches ? (
        <Carousel
          settings={{
            className: "Carousel",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [],
          }}
        >
          <ArticleTile
            title="Wiedźmin 3 znowu najlepszy!"
            src="./images/witcher3.jpg"
            author="Piotr Nowak"
            date="11.02.2022"
          />
          <ArticleTile
            title="Gaszenie pożaru w The Sims *Zobacz jak*"
            src="./images/sims.jpg"
            author="Bartłomiej Czekaj"
            date="10.02.2022"
          />
          <ArticleTile
            title="Jak sobie radzi GTA-Online 8 lat po premierze?"
            src="./images/gta.jpg"
            author="Bartłomiej Czekaj"
            date="11.02.2022"
          />
          <ArticleTile
            title="Premiera Daying Light 2 - co przyniesie najnowsza gra polskiej wytwórni?"
            src="./images/dl2.jpg"
            author="Bartłomiej Czekaj"
            date="11.02.2022"
          />
        </Carousel>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ArticleTile
              title="Wiedźmin 3 znowu najlepszy!"
              src="./images/witcher3.jpg"
              author="Piotr Nowak"
              date="11.02.2022"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ArticleTile
              title="Gaszenie pożaru w The Sims *Zobacz jak*"
              src="./images/sims.jpg"
              author="Bartłomiej Czekaj"
              date="10.02.2022"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ArticleTile
              title="Jak sobie radzi GTA-Online 8 lat po premierze?"
              src="./images/gta.jpg"
              author="Bartłomiej Czekaj"
              date="11.02.2022"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ArticleTile
              title="Premiera Daying Light 2 - co przyniesie najnowsza gra polskiej wytwórni?"
              src="./images/dl2.jpg"
              author="Bartłomiej Czekaj"
              date="11.02.2022"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
