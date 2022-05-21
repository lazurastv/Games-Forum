import { Box, Container, Grid, Typography } from "@mui/material";
import GameTile from "../../../components/Tile/GameTile";
import GamesFilter from "../../../components/Filters/GamesFilter/GamesFilter";
import PaginationFilter from "../../../components/Filters/PaginationFilter";
import { useState } from "react";
import withLoading from "../../../fetchData/withLoading";
import { loadAllGames } from "../../../fetchData/fetchGames";
import { GameSearchInfoVM } from "../../../api/api";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { ContentList } from "../ContentList.types";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface GamesProps extends ContentList {
  games: GameSearchInfoVM[];
}
function Games({ games, edit }: GamesProps) {
  const [idxToFilter, setIdxToFilter] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  console.log(games);
  return (
    <Container maxWidth="xl">
      <GamesFilter
        setSortOrder={setSortOrder}
        setLoading={setLoading}
        sliderLabel="DATA PUBLIKACJI:"
        data={games}
        page={1}
        setIdxToFilter={setIdxToFilter}
      />
      <Box sx={{ minHeight: "100vh" }}>
        {loading ? (
          <LoadingSpinner />
        ) : idxToFilter.length === games.length ? (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              minHeight: "200px",
            }}
          >
            {"Nie znaleziono żadnych gier odpowiadających ustawieniom filtrowania :("}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {sortOrder
              .map((id) => games.find((x) => x.id === id))
              .filter((x) => x && x.id && !idxToFilter.includes(x.id))
              .map((x: any, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                  <GameTile game={x} src={`${NGINX_URL}/${x.path}/horizontal.png`} />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>

      {/* <PaginationFilter maxPage={50} page={page} onPageChange={handlePageChange} /> */}
    </Container>
  );
}
export default withLoading(Games, { games: loadAllGames });
