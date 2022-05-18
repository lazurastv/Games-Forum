import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Typography } from "@mui/material";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
import { Link } from "react-router-dom";

interface IArticle {
  articleId: number;
  date: string;
  title: string;
  content:string;
  author: string;
  image: string;
}

export default function ArticleItem(props: IArticle) {
  const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down(900));
  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));
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
  const mode = theme.palette.mode;

  return (
    <Link to={`/artykuly/${props.articleId}`}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "primary.main",
          color: "text.primary",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 2,
          mt: 2,
          height: { ...height },
          "&:hover": {
            filter: mode === "light" ? "brightness(105%)" : "brightness(120%)",
            cursor: "pointer",
            color: "secondary.main",
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
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
            <Box
              component="div"
              display="flex"
              alignItems="center"
              color="text.secondary"
              sx={{ fontSize: { ...secondFontSize } }}
            >
              <AccessTimeIcon sx={{ mr: 1, fontSize: { ...iconSize } }} />
              {props.date}
            </Box>
            <Box component="div" sx={{ mb: 0.1, wordWrap: "break-word", fontSize: { ...titleFontSize } }}>
              <MultilineTruncatedText text={props.title} maxLine={isMD ? "2" : "3"} />
            </Box>
            <Box sx={{ my: 0.5, fontSize: { ...contentFontSize } }}>
              <MultilineTruncatedText text={props.content} maxLine={isXS ? "4" : "3"} />
            </Box>
          </Box>
          <Box component="div" color="text.secondary" sx={{ mb: 1.5, fontSize: { ...secondFontSize } }}>
            {props.author}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
