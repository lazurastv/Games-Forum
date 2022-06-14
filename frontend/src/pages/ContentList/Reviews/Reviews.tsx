import React from "react";
import Container from "@mui/material/Container";
import ReviewItem from "./ReviewItem";
import withLoading from "../../../fetchData/withLoading";
import { deleteReview, loadAllReviews } from "../../../fetchData/fetchReviews";
import Filter from "../../../components/Filters/Filter/Filter";
import { convertDate } from "../../../utils/convertDate";
import { ReviewSearchInfoVM } from "../../../api/api";
import { Box } from "@mui/material";
import { ContentList } from "../ContentList.types";
import useFilterData from "../../../hooks/useFilterData";
import EditMenuSupply from "../../../components/HoverableItem/EditMenuSupply";
import { useAlert } from "../../../hooks/useAlert";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface ReviewsProps extends ContentList {
  reviews: ReviewSearchInfoVM[];
}
const Reviews = (props: ReviewsProps): React.ReactNode => {
  const { reviews, edit, userName } = props;
  const { displayAlert } = useAlert();
  const filter = useFilterData(reviews, userName);
  const handleDeleteReview = (id: number, title: string) => {
    deleteReview(id)
      .then(() => displayAlert(`Pomyślenie usunięto "${title}" `))
      .catch((err) => displayAlert(`Błąd podczas usuwania "${title}" `, true));
    if (props.setReload) {
      props.setReload((r) => r + 1);
    }
  };
  return (
    <Container maxWidth="xl">
      <Filter sliderLabel="DATA PUBLIKACJI:" data={reviews} {...filter.filterControl} />
      <Box sx={{ minHeight: "100vh" }}>
        {filter.Feedback
          ? filter.Feedback
          : filter.data.map((r: any, idx) => (
              <EditMenuSupply key={idx} edit={edit} onDelete={() => handleDeleteReview(r.id, r.title)}>
                <ReviewItem
                  reviewId={r.id as number}
                  date={convertDate(r.publishDate)}
                  title={r.title ?? ""}
                  content={r.introduction ?? ""}
                  author={r.authorName ?? ""}
                  rate={r.score && isNaN(r.score) ? "?" : r.score?.toFixed(0) ?? -1}
                  image={`${NGINX_URL}/${r.path}/horizontal.jpg`}
                />
              </EditMenuSupply>
            ))}
      </Box>
    </Container>
  );
};
export default withLoading(Reviews, { reviews: loadAllReviews });
