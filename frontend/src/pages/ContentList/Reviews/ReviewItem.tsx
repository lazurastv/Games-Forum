import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import MultilineTruncatedText from "../../../components/MultilineTruncatedText";
import { Link } from "react-router-dom";
import HoverableItem from "../../../components/HoverableItem/HoverableItem";
import EditMenu from "../../../components/HoverableItem/EditMenu";
const height = { xs: "auto", sm: 280, md: 300 };
const imgWidth = { xs: "auto", sm: 180, md: 200 };
const imgHeight = { xs: 200, sm: 280, md: 300 };
const titleFontSize = { xs: 20, sm: 24, md: 36 };
const secondFontSize = { xs: 12, sm: 14, md: 16 };
const contentFontSize = { xs: 12, sm: 14, md: 16 };
const rateFontSize = { xs: 18, sm: 24, md: 28 };
const iconSize = { xs: 20, sm: 20, md: 24 };
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

  return (
    <HoverableItem>
      <Link to={`/recenzje/${props.reviewId}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            height: { ...height },
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
                <Typography sx={{ color: "secondary.main", fontSize: { ...rateFontSize } }}>{props.rate}/10</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
      <EditMenu />
    </HoverableItem>
  );
}
