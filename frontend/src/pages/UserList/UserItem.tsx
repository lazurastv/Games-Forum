import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
import HoverableItem from "../../components/HoverableItem/HoverableItem";
const height = { xs: 160, sm: 180, md: 200 };
const imgWidth = { xs: 120, sm: 180, md: 200 };
const textBoxSize = {
    xs: `calc(100% - 120px - 2*24px)`,
    sm: `calc(100% - 180px - 2*24px)`,
    md: `calc(100% - 200px - 2*24px)`,
};
const titleFontSize = { xs: 20, sm: 24, md: 36 };
const maxTitleHeight = { xs: 4.5 * 20, sm: 4.5 * 24, md: 80 };
const contentFontSize = { xs: 12, sm: 14, md: 16 };
const secondFontSize = { xs: 12, sm: 14, md: 16 };
const iconSize = { xs: 20, sm: 20, md: 24 };
const maxLine = { xs: "3", sm: "3", md: "2" };
interface IUser {
    id: number;
    username: string;
    email: string;
    shortDescription: string;
    image: string;
    role: string;
}
export default function UserItem(props: IUser) {
    const theme = useTheme();
    //const isMobile = useMediaQuery(theme.breakpoints.down(900));
    const isMD = useMediaQuery(theme.breakpoints.up("md"));
    const isXS = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <HoverableItem>
            <Link to={`/profil/${props.id}`}>
                <Box sx={{ display: "flex", height: { ...height } }}>
                    <Box
                        component="img"
                        sx={{
                            height: { ...height },
                            width: { ...imgWidth },
                            objectFit: "cover",
                        }}
                        src={props.image}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            mt: 1.5,
                            mx: 3,
                            width: { ...textBoxSize }, //image width and padding
                        }}
                    >
                        <Box>
                            <Box component="div" sx={{ mb: 0.1, wordWrap: "break-word", fontSize: { ...titleFontSize } }}>
                                <MultilineTruncatedText text={props.username} maxLine={isMD ? "2" : "1"} />
                            </Box>
                            <Box sx={{ my: 0.5, fontSize: { ...contentFontSize } }}>
                                <MultilineTruncatedText text={props.shortDescription} maxLine={isXS ? "3" : "2"} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </HoverableItem>
    );
}
