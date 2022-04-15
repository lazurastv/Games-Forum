import { Container, Grid } from "@mui/material";
import GameTile from "../../components/Tile/GameTile";
import { games } from "../../data-mock/games";
import SectionHeader from "../../components/SectionHeader";
import GamesFilter from "../../components/Filters/GamesFilter";
import PaginationFilter from "../../components/Filters/PaginationFilter";
import { useState } from "react";
export default function Games() {
  const [paginationConf, setPaginationConf] = useState({
    totalPages: 50,
    page: 1,
  });
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPaginationConf({ ...paginationConf, page: newPage });
  };
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader>Gry</SectionHeader>
      <GamesFilter page={paginationConf.page} />
      <Grid container spacing={2}>
        {[...Array(2)].map((x, i) =>
          games.map((game, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <GameTile title={game.title} src={game.src} author={game.author} date={game.date} />
            </Grid>
          ))
        )}
      </Grid>
      <PaginationFilter paginationConf={paginationConf} onPageChange={handlePageChange} />
    </Container>
  );
}
