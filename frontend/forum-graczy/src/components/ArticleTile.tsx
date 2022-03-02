import { Box } from "@mui/material";
import Tile from "./Tile";

export default function ArticleTile(props: any) {
  return (
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
  );
}
