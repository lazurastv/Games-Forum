import { Container, Grid } from "@mui/material";
import GameTile from "../../components/Tile/GameTile";
import { games } from "../../data-mock/games";
import SectionHeader from "../../components/SectionHeader";
import GamesFilter from "../../components/Filters/GamesFilter";
import PaginationFilter from "../../components/Filters/PaginationFilter";
import { useState } from "react";
import { paginationConf } from "../../components/Filters/filterConf";
export default function Games() {
  const [paginationConfig, setpaginationConfig] = useState(paginationConf);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setpaginationConfig({ ...paginationConfig, page: newPage });
  };
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader>Gry</SectionHeader>
      <GamesFilter page={paginationConfig.page} />
      <Grid container spacing={2}>
        {[...Array(2)].map((x, i) =>
          games.map((game, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <GameTile title={game.title} src={game.src} author={game.author} date={game.date} />
            </Grid>
          ))
        )}
      </Grid>
      <PaginationFilter paginationConf={paginationConfig} onPageChange={handlePageChange} />
    </Container>
  );
}
