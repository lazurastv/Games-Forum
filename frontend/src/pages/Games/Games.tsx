import { Container, Grid } from "@mui/material";
import GameTile from "../../components/Tile/GameTile";
import GamesFilter from "../../components/Filters/GamesFilter";
import PaginationFilter from "../../components/Filters/PaginationFilter";
import { useState } from "react";
import withLoading from "../../fetchData/withLoading";
import { loadAllGames } from "../../fetchData/fetchGames";
function Games({ data: gamesArray }) {
  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  return (
    <Container maxWidth="xl">
      <GamesFilter page={1} />
      <Grid container spacing={2}>
        {gamesArray.map((x, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <GameTile gameId={x.id} title={x.title} src="./images/Games/cp2077.jpg" />
          </Grid>
        ))}
      </Grid>
      {/* <PaginationFilter maxPage={50} page={page} onPageChange={handlePageChange} /> */}
    </Container>
  );
}
export default withLoading(Games, async () => await loadAllGames());
