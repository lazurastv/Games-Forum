import Container from "@mui/material/Container";
import ReviewItem from "./ReviewItem";
import withLoading from "../../fetchData/withLoading";
import { loadAllReviews } from "../../fetchData/fetchReviews";
import Filter from "../../components/Filters/Filter";
import { convertDate } from "../../utils/convertDate";

const Reviews = ({ data: reviewsArray }) => {
  return (
    <Container maxWidth="xl">
      <Filter />
      {reviewsArray.map((r, idx) => (
        <ReviewItem
          key={idx}
          reviewId={r.id}
          date={convertDate(r.publishDate)}
          title={r.title as string}
          content={"opis"}
          author={r.authorName as string}
          rate={2}
          image={"https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"}
        />
      ))}
    </Container>
  );
};
export default withLoading(Reviews, async () => await loadAllReviews());
