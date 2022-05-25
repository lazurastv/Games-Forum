import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Tile from "./Tile";
export default function ReviewTile(props: any) {
  return (
    <Link to={`/recenzje/${props.reviewId ?? 0}`}>
      <Tile
        small
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
