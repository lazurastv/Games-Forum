import { Box, Container, Grid, Typography } from "@mui/material";
import { ArticleFullInfoVM } from "../../../api/api";
import Author from "../../../components/Author";
import StyledEditorContent from "../../../components/Editor/StyledEditorContent";
import SectionHeader from "../../../components/SectionHeader";
import HeaderTile from "../../../components/Tile/HeaderTile";
import { articleDangerousHtml } from "../../../data-mock/editorData";
import { loadArticle } from "../../../fetchData/fetchArticles";
import withLoading from "../../../fetchData/withLoading";
import { convertDate } from "../../../utils/convertDate";
import SimilarArticles from "./SimilarArticles";
import Comments from "../Comments";
import ContentLikes from "../ContentLikes";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function Article({ article }: { article: ArticleFullInfoVM }) {
  return (
    <Box>
      <HeaderTile
        title={article.title}
        imgSrc={`${NGINX_URL}/${article.path}/horizontal.png`}
        caption={
          <Grid container direction="row" justifyContent="space-between">
            <Grid item><ContentLikes contentId={article.id as number}/></Grid>
            <Grid item>
              <Typography sx={{ textAlign: "right" }}>
                {convertDate(article.publishDate)}
              </Typography>
            </Grid>
          </Grid>
        }
      />
      <Container maxWidth="lg">
        <Box sx={{ pb: 6 }}>
          <Author sx={{ maxWidth: "550px" }} authorData={article.author} />
          <StyledEditorContent>
            <div dangerouslySetInnerHTML={{ __html: articleDangerousHtml }} />
          </StyledEditorContent>
        </Box>
        <SectionHeader>Podobne artykuły</SectionHeader>
        <SimilarArticles />
        <SectionHeader>Komentarze</SectionHeader>
        <Comments contentId={article.id} />
      </Container>
    </Box>
  );
}
export default withLoading(Article, {
  article: loadArticle,
});
