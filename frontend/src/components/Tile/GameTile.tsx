import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { GameSearchInfoVM } from "../../api/api";
import { gameDatafromDB } from "../../dictionary/mapData";
import Tile from "./Tile";
const Rating = (props: any) => (
  <Box
    sx={{
      ...props.sx,
      position: "absolute",
      right: "15px",
      width: "65px",
      height: "50px",
      backgroundColor: "rgba(0,0,0,0.8)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "100",
    }}
  >
    <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>{props.children}</Typography>
  </Box>
);
interface GameTileProps {
  game: GameSearchInfoVM;
  src: string;
}
export default function GameTile({ game, src }: GameTileProps) {
  return (
    <Link to={`/gry/${game.id}`}>
      <Tile
        small
        src={src}
        title={game.title}
        caption={
          <Box
            sx={{
              width: "100%",
              textAlign: "left",
            }}
          >
            <div>{game.developer}</div>
            <div>
              {game.genres &&
                game.genres.map((v, idx) => (
                  <span key={idx}>
                    {gameDatafromDB(v)}
                    {game.genres && idx < game.genres.length - 1 ? ", " : ""}
                  </span>
                ))}
            </div>
          </Box>
        }
      >
        <Rating
          sx={{
            top: "15px",
            color: "secondary.main",
          }}
        >
          {game.editorScore?.toFixed(0)}/10
        </Rating>
        <Rating
          sx={{
            top: "70px",
          }}
        >
          {game.meanUserScore
            ? isNaN(game.meanUserScore)
              ? "?"
              : game.meanUserScore.toFixed(1)
            : "?"}
          /10
        </Rating>
      </Tile>
    </Link>
  );
}
