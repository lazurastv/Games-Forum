import { Box, Container, Grid, Typography } from "@mui/material";
import { ReviewFullInfoVM } from "../../api/api";
import Author from "../../components/Author";
import SectionHeader from "../../components/SectionHeader";
import HeaderTile from "../../components/Tile/HeaderTile";
import { loadReview } from "../../fetchData/fetchReviews";
import withLoading from "../../fetchData/withLoading";
import { convertDate } from "../../utils/convertDate";
import { stringToHtml } from "../../utils/dataConversion";
import ReviewRating from "./ReviewRating";
import SimilarReviews from "./SimilarReviews";
function Review({ review }: { review: ReviewFullInfoVM }) {
  return (
    <Box>
      <HeaderTile
        title={review.title}
        imgSrc="https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg"
        caption={<Typography sx={{ textAlign: "right" }}>{convertDate(review.publishDate)}</Typography>}
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
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>{review.introduction}</Typography>
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>{/* {stringToHtml(review.path)} */}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <ReviewRating
              sx={{ mb: 5 }}
              score={review.score && isNaN(review.score) ? "?" : review.score?.toFixed(0)}
              pluses={review.pluses}
              minuses={review.minuses}
            />
            <Author sx={{ mb: 5 }} authorData={review.author} />
          </Grid>
        </Grid>
        <SectionHeader>Podobne recenzje</SectionHeader>
        <SimilarReviews />
      </Container>
    </Box>
  );
}
export default withLoading(Review, {
  review: loadReview,
});
