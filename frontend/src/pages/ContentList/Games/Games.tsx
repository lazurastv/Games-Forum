import { Box, Container, Grid } from "@mui/material";
import GameTile from "../../../components/Tile/GameTile";
import GamesFilter from "../../../components/Filters/GamesFilter/GamesFilter";
import { useState } from "react";
import withLoading from "../../../fetchData/withLoading";
import { deleteGame, loadAllGames } from "../../../fetchData/fetchGames";
import { GameSearchInfoVM } from "../../../api/api";
import { ContentList } from "../ContentList.types";
import useFilterData from "../../../hooks/useFilterData";
import EditMenuSupply from "../../../components/HoverableItem/EditMenuSupply";
import { useAlert } from "../../../hooks/useAlert";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface GamesProps extends ContentList {
  games: GameSearchInfoVM[];
}
function Games(props: GamesProps) {
  const { games, edit, userName } = props;
  const filter = useFilterData(games, userName);
  const [page, setPage] = useState(1);
  const { displayAlert } = useAlert();
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  const handleDeleteGame = (id: number, title: string) => {
    deleteGame(id)
      .then(() => displayAlert(`Pomyślenie usunięto "${title}" `))
      .catch((err) => displayAlert(`Błąd podczas usuwania "${title}" `, true));
    if (props.setReload) {
      props.setReload((r) => r + 1);
    }
  };

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
                <EditMenuSupply edit={edit} position="left" onDelete={() => handleDeleteGame(x.id, x.title)}>
                  <GameTile game={x} src={`${NGINX_URL}/${x.path}/horizontal.jpg`} />
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
