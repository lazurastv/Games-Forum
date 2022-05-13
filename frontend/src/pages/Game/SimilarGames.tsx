import React from "react";
import { GameSearchInfoVM } from "../../api/api";
import Carousel from "../../components/Carousel/Carousel";
import GameTile from "../../components/Tile/GameTile";
import { loadSimilarGames } from "../../fetchData/fetchGames";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";

function SimilarGames({ data: games }: { data: GameSearchInfoVM }) {
  console.log(games);
  return (
    <Carousel>
      {Array(10)
        .fill(games)
        .flat()
        .map((a, idx) => (
          <GameTile key={idx} game={a} src="https://allegro.stati.pl/AllegroIMG/PRODUCENCI/Bethesda/Fallout%204/GOTY/f2.jpg" />
        ))}
    </Carousel>
  );
}
export default withLoading(SimilarGames, async (fetchId: number) => loadSimilarGames(fetchId));
