import { Box, Grid, useMediaQuery } from "@mui/material";
import Carousel from "../../components/Carousel/Carousel";
import ArticleTile from "../../components/Tile/ArticleTile";
import { useTheme } from "@mui/material/styles";
import { ArticleVM } from "../../api/api";
import withLoading from "../../fetchData/withLoading";
import { loadAllArticles } from "../../fetchData/fetchArticles";

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function TopNews({ news }: { news: ArticleVM[] }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className="TopNews" sx={{ mb: 4 }}>
      {matches ? (
        <Carousel
          settings={{
            className: "Carousel",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [],
          }}
        >
          {
            news.slice(0, 4).map(x =>
              <ArticleTile
                title={x.title}
                src={`${NGINX_URL}/${x.path}/horizontal.png`}
                author={x.authorName}
                date={x.publishDate}
              />
            )
          }
        </Carousel>
      ) : (
        <Grid container spacing={3}>
          {
            news.slice(0, 4).map((x, id) =>
              <Grid item xs={12} md={12 - id % 2 * 4}>
                <ArticleTile
                  title={x.title}
                  src={`${NGINX_URL}/${x.path}/horizontal.png`}
                  author={x.authorName}
                  date={x.publishDate}
                />
              </Grid>
            )
          }
        </Grid>
      )}
    </Box>
  );
}
export default withLoading(TopNews, { news: loadAllArticles });