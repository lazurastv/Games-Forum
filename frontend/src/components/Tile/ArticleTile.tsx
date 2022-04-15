import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Tile from "./Tile";

export default function ArticleTile(props: any) {
  return (
    <Link to={`/recenzje/${props.title}`}>
      <Tile
        src={props.src}
        caption={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{props.author}</span>
            <span>{props.date}</span>
          </Box>
        }
        title={props.title}
      />
    </Link>
  );
}
