import { Box, Grid, useMediaQuery } from "@mui/material";
import Carousel from "../../components/Carousel/Carousel";
import ArticleTile from "../../components/Tile/ArticleTile";
import { useTheme } from "@mui/material/styles";
import { ArticleVM } from "../../api/api";
import withLoading from "../../fetchData/withLoading";
import { loadAllArticles } from "../../fetchData/fetchArticles";
import { compareDate, convertDate } from "../../utils/convertDate";

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
            news
              .sort((a, b) => -compareDate(a.publishDate!, b.publishDate!))
              .slice(0, 4)
              .map((x, id) =>
                <ArticleTile
                  key={id}
                  articleId={x.id}
                  title={x.title}
                  src={`${NGINX_URL}/${x.path}/horizontal.jpg`}
                  author={x.authorName}
                  date={convertDate(x.publishDate)}
                />
              )
          }
        </Carousel>
      ) : (
        <Grid container spacing={3}>
          {
            news
              .sort((a, b) => -compareDate(a.publishDate!, b.publishDate!))
              .slice(0, 4)
              .map((x, id) =>
                <Grid item key={id} xs={12} md={id % 3 === 0 ? 8 : 4}>
                  <ArticleTile
                    articleId={x.id}
                    title={x.title}
                    src={`${NGINX_URL}/${x.path}/horizontal.jpg`}
                    author={x.authorName}
                    date={convertDate(x.publishDate)}
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