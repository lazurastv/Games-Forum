import React, { useState } from "react";
import Container from "@mui/material/Container";
import ReviewItem from "./ReviewItem";
import withLoading from "../../fetchData/withLoading";
import { loadAllReviews } from "../../fetchData/fetchReviews";
import Filter from "../../components/Filters/Filter/Filter";
import { convertDate } from "../../utils/convertDate";
import { ReviewSearchInfoVM } from "../../api/api";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Reviews = ({ reviews }: { reviews: ReviewSearchInfoVM[] }): React.ReactNode => {
  const [idxToFilter, setIdxToFilter] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Container maxWidth="xl">
      <Filter setLoading={setLoading} sliderLabel="DATA PUBLIKACJI:" data={reviews} setIdxToFilter={setIdxToFilter} />
      <Box sx={{ minHeight: "100vh" }}>
        {loading ? (
          <LoadingSpinner />
        ) : idxToFilter.length === reviews.length ? (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              minHeight: "200px",
            }}
          >
            {"Nie znaleziono żadnych recenzji odpowiadających ustawieniom filtrowania :("}
          </Typography>
        ) : (
          reviews
            .filter((a, idx) => a.id && !idxToFilter.includes(a.id))
            .map((r, idx) => (
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
            ))
        )}
      </Box>
    </Container>
  );
};
export default withLoading(Reviews, { reviews: loadAllReviews });
