import { GameSearchInfoVM } from "../../api/api";
import Carousel from "../../components/Carousel/Carousel";
import GameTile from "../../components/Tile/GameTile";
import { loadAllGames } from "../../fetchData/fetchGames";
import withLoading from "../../fetchData/withLoading";

const NGINX_URL = process.env.REACT_APP_CONTENT;

function SampleGames({ games }: { games: GameSearchInfoVM[] }) {
    return (
        <Carousel>
            {
                games.map((x, id) =>
                    <GameTile
                        key={id}
                        game={x}
                        src={`${NGINX_URL}/${x.path}/horizontal.jpg`}
                    />
                )
            }
        </Carousel>
    );
}
export default withLoading(SampleGames, { games: loadAllGames });