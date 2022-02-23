import { Box, Grid } from "@mui/material";
import ArticleTile from "../../components/ArticleTile";
export default function TopNews() {
  return (
    <Box className="TopNews" >
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ArticleTile
            title="Wiedźmin 3 znowu najlepszy!"
            src="./images/witcher3.jpg"
            author="Piotr Nowak"
            date="11.02.2022"
          />
        </Grid>
        <Grid item xs={4}>
          <ArticleTile
            title="Gaszenie pożaru w The Sims *Zobacz jak*"
            src="./images/sims.jpg"
            author="Bartłomiej Czekaj"
            date="10.02.2022"
          />
        </Grid>
        <Grid item xs={4}>
          <ArticleTile
            title="Jak sobie radzi GTA-Online 8 lat po premierze?"
            src="./images/gta.jpg"
            author="Bartłomiej Czekaj"
            date="11.02.2022"
          />
        </Grid>
        <Grid item xs={8}>
          <ArticleTile
            title="Premiera Daying Light 2 - co przyniesie najnowsza gra polskiej wytwórni?"
            src="./images/dl2.jpg"
            author="Bartłomiej Czekaj"
            date="11.02.2022"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
