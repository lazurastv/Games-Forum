import { Box, Container, Typography } from "@mui/material";
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

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function Article({ article }: { article: ArticleFullInfoVM }) {
  return (
    <Box>
      <HeaderTile
        title={article.title}
        imgSrc={`${NGINX_URL}/${article.path}/horizontal.png`}
        caption={<Typography sx={{ textAlign: "right" }}>{convertDate(article.publishDate)}</Typography>}
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
      </Container>
    </Box>
  );
}
export default withLoading(Article, {
  article: loadArticle,
});
