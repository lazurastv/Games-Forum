import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import GameTile from "../../components/Tile/GameTile";
import { loadSimilarGames } from "../../fetchData/fetchGames";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";

function SimilarGames({ data: games }) {
  console.log(games);
  return (
    <Carousel>
      {Array(10)
        .fill(games)
        .flat()
        .map((a, idx) => (
          <GameTile
            gameId={a.id}
            key={idx}
            title={a.title}
            src="https://allegro.stati.pl/AllegroIMG/PRODUCENCI/Bethesda/Fallout%204/GOTY/f2.jpg"
            author={a.authorName}
            date={convertDate(a.publishDate)}
          />
        ))}
    </Carousel>
  );
}
export default withLoading(SimilarGames, async (fetchId: number) => loadSimilarGames(fetchId));
