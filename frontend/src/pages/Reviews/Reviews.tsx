import Container from "@mui/material/Container";
import ReviewItem from "./ReviewItem";
import withLoading from "../../fetchData/withLoading";
import { loadAllReviews } from "../../fetchData/fetchReviews";
import Filter from "../../components/Filters/Filter";
import { convertDate } from "../../utils/convertDate";
import { ReviewSearchInfoVM } from "../../api/api";

const Reviews = ({ data: reviewsArray }: { data: ReviewSearchInfoVM[] }) => {
  return (
    <Container maxWidth="xl">
      <Filter />
      {reviewsArray.map((r, idx) => (
        <ReviewItem
          key={idx}
          reviewId={r.id as number}
          date={convertDate(r.publishDate)}
          title={r.title as string}
          content={r.introduction as string}
          author={r.authorName as string}
          rate={r.score as number}
          image={"https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"}
        />
      ))}
    </Container>
  );
};
export default withLoading(Reviews, async () => await loadAllReviews());
