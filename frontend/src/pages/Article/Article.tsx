import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ArticleFullInfoVM } from "../../api/api";
import Author from "../../components/Author";
import SectionHeader from "../../components/SectionHeader";
import HeaderTile from "../../components/Tile/HeaderTile";
import { loadArticle } from "../../fetchData/fetchArticles";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";
import { stringToHtml } from "../../utils/dataConversion";
import SimilarArticles from "./SimilarArticles";
function Article({ article }: { article: ArticleFullInfoVM }) {
  return (
    <Box>
      <HeaderTile
        title={article.title}
        imgSrc="https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg"
        caption={
          <Typography sx={{ textAlign: "right" }}>{convertDate(article.publishDate)}</Typography>
        }
      />
      <Container maxWidth="xl">
        <Grid container sx={{ flexWrap: "wrap-reverse", pb: 6 }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              pr: {
                xs: 0,
                md: 15,
              },
            }}
          >
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>
              {article.introduction}
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>
              {/* {stringToHtml(article.path)} */}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Author sx={{ mb: 5 }} authorData={article.author} />
          </Grid>
        </Grid>
        <SectionHeader>Podobne artykuły</SectionHeader>
        <SimilarArticles />
      </Container>
    </Box>
  );
}
export default withLoading(Article, {
  article: loadArticle,
});
