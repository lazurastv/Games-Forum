import { Container, Grid, Typography } from "@mui/material";
import GameTile from "../../components/Tile/GameTile";
import GamesFilter from "../../components/Filters/GamesFilter/GamesFilter";
import PaginationFilter from "../../components/Filters/PaginationFilter";
import { useState } from "react";
import withLoading from "../../fetchData/withLoading";
import { loadAllGames } from "../../fetchData/fetchGames";
import { GameSearchInfoVM } from "../../api/api";
function Games({ games }: { games: GameSearchInfoVM[] }) {
  const [idxToFilter, setIdxToFilter] = useState([]);
  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  return (
    <Container maxWidth="xl">
      <GamesFilter data={games} page={1} setIdxToFilter={setIdxToFilter} />
      <Grid container spacing={2}>
        {idxToFilter.length === games.length ? (
          <Typography sx={{ display: "flex", justifyContent: "center", fontSize: "24px" }}>
            {"Nie znaleziono żadnych gier odpowiadających ustawieniom filtrowania :("}
          </Typography>
        ) : (
          games.map((x, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <GameTile game={x} src="./images/Games/cp2077.jpg" />
            </Grid>
          ))
        )}
      </Grid>
      {/* <PaginationFilter maxPage={50} page={page} onPageChange={handlePageChange} /> */}
    </Container>
  );
}
export default withLoading(Games, { games: loadAllGames });
