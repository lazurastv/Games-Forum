import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ArticleFullInfoVM } from "../../api/api";
import Author from "../../components/Author";
import StyledEditorContent from "../../components/Editor/StyledEditorContent";
import SectionHeader from "../../components/SectionHeader";
import HeaderTile from "../../components/Tile/HeaderTile";
import { articleDangerousHtml } from "../../data-mock/editorData";
import { loadArticle } from "../../fetchData/fetchArticles";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";
import { stringToHtml } from "../../components/Editor/dataConversion";
import SimilarArticles from "./SimilarArticles";
function Article({ article }: { article: ArticleFullInfoVM }) {
  return (
    <Box>
      <HeaderTile
        title={article.title}
        imgSrc="https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg"
        caption={<Typography sx={{ textAlign: "right" }}>{convertDate(article.publishDate)}</Typography>}
      />
      <Container maxWidth="xl">
        <Container maxWidth="lg">
          <Box sx={{ pb: 6 }}>
            <Author sx={{ mb: 5, maxWidth: "550px" }} authorData={article.author} />
            <StyledEditorContent>
              <div dangerouslySetInnerHTML={{ __html: articleDangerousHtml }} />
            </StyledEditorContent>
          </Box>
        </Container>
        <SectionHeader>Podobne artykuły</SectionHeader>
        <SimilarArticles />
      </Container>
    </Box>
  );
}
export default withLoading(Article, {
  article: loadArticle,
});
