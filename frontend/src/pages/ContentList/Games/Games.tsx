import { Box, Container, Grid } from "@mui/material";
import GameTile from "../../../components/Tile/GameTile";
import GamesFilter from "../../../components/Filters/GamesFilter/GamesFilter";
import { useState } from "react";
import withLoading from "../../../fetchData/withLoading";
import { loadAllGames } from "../../../fetchData/fetchGames";
import { GameSearchInfoVM } from "../../../api/api";
import { ContentList } from "../ContentList.types";
import useFilterData from "../../../hooks/useFilterData";
import EditMenuSupply from "../../../components/HoverableItem/EditMenuSupply";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface GamesProps extends ContentList {
  games: GameSearchInfoVM[];
}
function Games(props: GamesProps) {
  const { games, edit, userName } = props;
  const filter = useFilterData(games, userName);
  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  console.log(games);
  return (
    <Container maxWidth="xl">
      <GamesFilter sliderLabel="DATA PUBLIKACJI:" data={games} page={1} {...filter.filterControl} />
      <Box sx={{ minHeight: "100vh" }}>
        {filter.Feedback ? (
          filter.Feedback
        ) : (
          <Grid container spacing={2}>
            {filter.data.map((x: any, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <EditMenuSupply edit={edit} position="left">
                  <GameTile game={x} src={`${NGINX_URL}/${x.path}/horizontal.png`} />
                </EditMenuSupply>
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
