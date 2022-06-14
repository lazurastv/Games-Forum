import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { GameVM } from "../api/api";
import Widget from "./Widget";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface GameProps {
    gameData: GameVM;
    sx?: any;
}
export default function Game({ gameData, sx }: GameProps) {
    return (
        <Link to={`/gry/${gameData.id}`}>
            <Widget sx={{ ...sx, mb: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                        alt={gameData.title}
                        src={`${NGINX_URL}/${gameData.path}/horizontal.jpg`}
                        sx={{ mr: 1 }}
                    />
                    <Typography sx={{ fontSize: "18px", textAlign: "left" }}>{gameData.title}</Typography>
                </Box>
                <Divider sx={{ borderColor: "primary.main" }} />
                <Typography
                    sx={{
                        fontSize: "16px",
                        textAlign: "left",
                        mt: 2,
                    }}
                >
                    {gameData.introduction}
                </Typography>
            </Widget>
        </Link>
    );
}
