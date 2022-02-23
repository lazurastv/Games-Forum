import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface IArticle {
  date: string;
  title: string;
  author: string;
  image: string;
}

export default function ArticleItem(props:IArticle) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const isLarge = useMediaQuery(theme.breakpoints.up(1200));
  const height = { xs: 160, sm: 180, md: 200 };
  const imgWidth = { xs: 160, sm: 180, md: 200 };
  const titleFontSize = { xs: 20, sm: 24, md: 36 };
  const secondFontSize = { xs: 12, sm: 14, md: 16 };
  const iconSize = { xs: 20, sm: 20, md: 24 };


  return (
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
      }}
    >
      <Box
        component="img"
        sx={{
          height: { ...height },
          width:  { ...imgWidth },
          objectFit: "cover",
        }}
        src={props.image}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: 'flex-start',
          mt: 1.5,
          mx: 3
        }}
      >
        <Box component="span" display="flex" alignItems="center" color="text.secondary" sx={{ fontSize: { ...secondFontSize }}}>
          <AccessTimeIcon sx={{ mr: 1, fontSize: { ...iconSize }}}/>
          {props.date}
        </Box>
        <Box
          component="span"
          sx={{ fontSize: { ...titleFontSize }, mb: 0.1 }}
        >
          {isMobile
            ? props.title.length > 50
              ? props.title.substring(0, 50).concat("...")
              : props.title
            : props.title.length > 60
            ? isLarge ? props.title : props.title.substring(0, 60).concat("...")
            : props.title}
        </Box>
        <Box component="span" color="text.secondary" sx={{ fontSize: { ...secondFontSize} }}>
          {props.author}
        </Box>
      </Box>
    </Box>
  );
}