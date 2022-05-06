import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
import { Link } from "react-router-dom";

interface IReview {
  reviewId: number;
  date: string;
  title: string;
  content: string;
  author: string;
  rate: number;
  image: string;
}

export default function ReviewItem(props: IReview) {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));
  const height = { xs: "auto", sm: 280, md: 300 };
  const imgWidth = { xs: "auto", sm: 180, md: 200 };
  const imgHeight = { xs: 200, sm: 280, md: 300 };
  const titleFontSize = { xs: 20, sm: 24, md: 36 };
  const secondFontSize = { xs: 12, sm: 14, md: 16 };
  const contentFontSize = { xs: 12, sm: 14, md: 16 };
  const rateFontSize = { xs: 18, sm: 24, md: 28 };
  const iconSize = { xs: 20, sm: 20, md: 24 };
  const mode = theme.palette.mode;

  return (
    <Link to={`/recenzje/${props.reviewId}`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
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
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          component="img"
          sx={{
            height: { ...imgHeight },
            width: { ...imgWidth },
            objectFit: "cover",
          }}
          src={props.image}
          alignItems="center"
        />
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: 1.5,
            mx: 3,
          }}
        >
          <Box>
            <Box
              component="span"
              display="flex"
              alignItems="center"
              color="text.secondary"
              sx={{ fontSize: { ...secondFontSize } }}
            >
              <AccessTimeIcon sx={{ mr: 1, fontSize: { ...iconSize } }} />
              {props.date}
            </Box>
            <Box component="span" sx={{ fontSize: { ...titleFontSize }, mb: 0.1 }}>
              <MultilineTruncatedText text={props.title} maxLine={isMD ? "2" : "3"} />
            </Box>
            <Box sx={{ my: 0.5, fontSize: { ...contentFontSize } }}>
              <MultilineTruncatedText text={props.content} maxLine={isXS ? "5" : "4"} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box component="span" color="text.secondary" sx={{ fontSize: { ...secondFontSize } }}>
              {props.author}
            </Box>
            <Box display="flex" alignItems="center">
              <Box component="span" color="text.secondary" sx={{ mr: 1, fontSize: { ...secondFontSize } }}>
                ocena:
              </Box>
              <Typography sx={{ color: "secondary.main", fontSize: { ...rateFontSize } }}> {props.rate}/10 </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
