import { Box, Container, Grid, Typography } from "@mui/material";
import { ReviewFullInfoVM } from "../../../api/api";
import Author from "../../../components/Author";
import SectionHeader from "../../../components/SectionHeader";
import HeaderTile from "../../../components/Tile/HeaderTile";
import { loadReview } from "../../../fetchData/fetchReviews";
import withLoading from "../../../fetchData/withLoading";
import { convertDate } from "../../../utils/convertDate";
import { stringToHtml } from "../../../components/Editor/dataConversion";
import ReviewRating from "./ReviewRating";
import SimilarReviews from "./SimilarReviews";
import StyledEditorContent from "../../../components/Editor/StyledEditorContent";
import Comments from "../Comments";
import { ReviewFullInfoPlusContent } from "../../../api/api/models/ReviewFullInfoPlusContent";
import Game from "../../../components/Game";

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function Review({ review }: { review: ReviewFullInfoPlusContent }) {
  return (
    <Box>
      <HeaderTile
        title={review.title}
        imgSrc={`${NGINX_URL}/${review.path}/horizontal.jpg`}
        caption={<Typography sx={{ textAlign: "right" }}>{convertDate(review.publishDate)}</Typography>}
      />
      <Container maxWidth="lg">
        <Grid container sx={{ flexWrap: "wrap-reverse", pb: 6 }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              pr: { xs: 0, md: 5 },
            }}
          >
            <StyledEditorContent>
              <div dangerouslySetInnerHTML={{ __html: review.content !== undefined ? stringToHtml(review.content) : "" }} />
            </StyledEditorContent>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Author authorData={review.author} />
            <Game gameData={review.game!} />
            <ReviewRating
              sx={{ mb: 5 }}
              score={
                review.score && isNaN(review.score)
                  ? "?"
                  : review.score?.toFixed(0)
              }
              pluses={review.pluses}
              minuses={review.minuses}
            />
          </Grid>
        </Grid>
        <SectionHeader>Podobne recenzje</SectionHeader>
        <SimilarReviews />
        <SectionHeader>Komentarze</SectionHeader>
        <Comments contentId={review.id} />
      </Container>
    </Box>
  );
}
export default withLoading(Review, {
  review: async (id) => {
    let rev = await loadReview(id);
    let content = await fetch(`https://forum-graczy-backend.herokuapp.com/content/${rev.path}/content.json`)
      .then(res => res.json()).then(data => JSON.stringify(data));
    let articleWithContent: ReviewFullInfoPlusContent = rev;
    articleWithContent.content = content;
    return articleWithContent;
  },
});
