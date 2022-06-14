import { Box, Container, Grid, Typography } from "@mui/material";
import { ArticleFullInfoVM } from "../../../api/api";
import Author from "../../../components/Author";
import StyledEditorContent from "../../../components/Editor/StyledEditorContent";
import SectionHeader from "../../../components/SectionHeader";
import HeaderTile from "../../../components/Tile/HeaderTile";
import { loadArticle } from "../../../fetchData/fetchArticles";
import withLoading from "../../../fetchData/withLoading";
import { convertDate } from "../../../utils/convertDate";
import SimilarArticles from "./SimilarArticles";
import Comments from "../Comments";
import ContentLikes from "../ContentLikes";
import { stringToHtml } from "../../../components/Editor/dataConversion";
import { ArticleFullInfoPlusContent } from "../../../api/api/models/ArticleFullInfoPlusContent";

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function Article({ article }: { article: ArticleFullInfoPlusContent }) {
  return (
    <Box>
      <HeaderTile
        title={article.title}
        imgSrc={`${NGINX_URL}/${article.path}/horizontal.jpg`}
        caption={
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <ContentLikes contentId={article.id as number} />
            </Grid>
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
            <div
              dangerouslySetInnerHTML={{
                __html:
                  article.content !== undefined
                    ? stringToHtml(article.content)
                    : "",
              }}
            />
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
  article: async (id) => {
    let art = await loadArticle(id);
    let content = await fetch(
      `https://forum-graczy.herokuapp.com/data/content/${art.path}/content.json`
    )
      .then((res) => res.json())
      .then((data) => JSON.stringify(data));
    let articleWithContent: ArticleFullInfoPlusContent = art;
    articleWithContent.content = content;
    return articleWithContent;
  },
});
