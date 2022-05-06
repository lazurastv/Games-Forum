import { Container, Grid } from "@mui/material";
import GameTile from "../../components/Tile/GameTile";
import SectionHeader from "../../components/SectionHeader";
import GamesFilter from "../../components/Filters/GamesFilter";
import PaginationFilter from "../../components/Filters/PaginationFilter";
import { useState } from "react";
import { paginationConf } from "../../components/Filters/filterConf";
import withLoading from "../../fetchData/withLoading";
import { loadAllGames } from "../../fetchData/fetchGames";
function Games({ data: gamesArray }) {
  const [paginationConfig, setpaginationConfig] = useState(paginationConf);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setpaginationConfig({ ...paginationConfig, page: newPage });
  };
  console.log(gamesArray);
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader>Gry</SectionHeader>
      <GamesFilter page={paginationConfig.page} />
      <Grid container spacing={2}>
        {gamesArray.map((x, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <GameTile title={x.title} src="./images/Games/cp2077.jpg" />
          </Grid>
        ))}
      </Grid>
      <PaginationFilter paginationConf={paginationConfig} onPageChange={handlePageChange} />
    </Container>
  );
}
export default withLoading(Games, async () => await loadAllGames());
