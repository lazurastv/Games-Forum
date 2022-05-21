import React, { useState } from "react";
import Container from "@mui/material/Container";
import ReviewItem from "./ReviewItem";
import withLoading from "../../../fetchData/withLoading";
import { loadAllReviews } from "../../../fetchData/fetchReviews";
import Filter from "../../../components/Filters/Filter/Filter";
import { convertDate } from "../../../utils/convertDate";
import { ReviewSearchInfoVM } from "../../../api/api";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { ContentList } from "../ContentList.types";
import useFilterData from "../../../hooks/useFilterData";
const NGINX_URL = process.env.REACT_APP_NGINX_CONTENT;
interface ReviewsProps extends ContentList {
  reviews: ReviewSearchInfoVM[];
}
const Reviews = (props: ReviewsProps): React.ReactNode => {
  const { reviews } = props;
  const filter = useFilterData(reviews);
  return (
    <Container maxWidth="xl">
      <Filter sliderLabel="DATA PUBLIKACJI:" data={reviews} {...filter.filterControl} />
      <Box sx={{ minHeight: "100vh" }}>
        {filter.Feedback
          ? filter.Feedback
          : filter.data.map((r: any, idx) => (
              <ReviewItem
                key={idx}
                reviewId={r.id as number}
                date={convertDate(r.publishDate)}
                title={r.title ?? ""}
                content={r.introduction ?? ""}
                author={r.authorName ?? ""}
                rate={r.score && isNaN(r.score) ? "?" : r.score?.toFixed(0) ?? -1}
                image={`${NGINX_URL}/${r.path}/horizontal.png`}
              />
            ))}
      </Box>
    </Container>
  );
};
export default withLoading(Reviews, { reviews: loadAllReviews });
