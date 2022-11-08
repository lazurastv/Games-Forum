import React from "react";
import { GameSearchInfoVM } from "../../../api/api";
import Carousel from "../../../components/Carousel/Carousel";
import GameTile from "../../../components/Tile/GameTile";
import { loadSimilarGames } from "../../../fetchData/fetchGames";
import withLoading from "../../../fetchData/withLoading";

const NGINX_URL = process.env.REACT_APP_CONTENT;

function SimilarGames({ games }: { games: GameSearchInfoVM }) {
  console.log(games);

  return (
    <Carousel>
      {Array(10)
        .fill(games)
        .flat()
        .map((a, idx) => (
          <GameTile
            key={idx}
            game={a}
            src={`${NGINX_URL}/${a.path}/horizontal.jpg`}
          />
        ))}
    </Carousel>
  );
}
export default withLoading(SimilarGames, {
  games: async (fetchId: number) => loadSimilarGames(fetchId),
});
