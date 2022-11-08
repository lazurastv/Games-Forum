import { ReviewSearchInfoVM } from "../../../api/api";
import Carousel from "../../../components/Carousel/Carousel";
import ReviewTile from "../../../components/Tile/ReviewTile";
import { loadSimilarReviews } from "../../../fetchData/fetchReviews";
import withLoading from "../../../fetchData/withLoading";
import { convertDate } from "../../../utils/convertDate";

const NGINX_URL = process.env.REACT_APP_CONTENT;

function SimilarReviews({ reviews }: { reviews: ReviewSearchInfoVM }) {
  return (
    <Carousel>
      {Array(10)
        .fill(reviews)
        .flat()
        .map((a, idx) => (
          <ReviewTile
            key={idx}
            reviewId={a.id}
            title={a.title}
            src={`${NGINX_URL}/${a.path}/horizontal.jpg`}
            author={a.authorName}
            date={convertDate(a.publishDate)}
          />
        ))}
    </Carousel>
  );
}
export default withLoading(SimilarReviews, {
  reviews: async (fetchId: number) => loadSimilarReviews(fetchId),
});
