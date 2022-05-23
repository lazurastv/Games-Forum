import { ReviewSearchInfoVM } from "../../api/api";
import Carousel from "../../components/Carousel/Carousel";
import ReviewTile from "../../components/Tile/ReviewTile";
import { loadAllReviews } from "../../fetchData/fetchReviews";
import withLoading from "../../fetchData/withLoading";
import { compareDate, convertDate } from "../../utils/convertDate";

const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;

function LatestReviews({ reviews }: { reviews: ReviewSearchInfoVM[] }) {
    return (
        <Carousel>
            {
                reviews
                    .sort((a, b) => -compareDate(a.publishDate!, b.publishDate!))
                    .map((x, id) =>
                        <ReviewTile
                            reviewId={x.id}
                            key={id}
                            title={x.title}
                            src={`${NGINX_URL}/${x.path}/horizontal.png`}
                            author={x.authorName}
                            date={convertDate(x.publishDate)}
                        />
                    )
            }
        </Carousel>
    );
}
export default withLoading(LatestReviews, { reviews: loadAllReviews });