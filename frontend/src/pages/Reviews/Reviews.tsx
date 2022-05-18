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
  const [sortOrder, setSortOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Container maxWidth="xl">
      <Filter
        setSortOrder={setSortOrder}
        setLoading={setLoading}
        sliderLabel="DATA PUBLIKACJI:"
        data={reviews}
        setIdxToFilter={setIdxToFilter}
      />
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
          sortOrder
            .map((id) => reviews.find((r) => r.id === id))
            .filter((r) => r && r.id && !idxToFilter.includes(r.id))
            .map((r: any, idx) => (
              <ReviewItem
                key={idx}
                reviewId={r.id as number}
                date={convertDate(r.publishDate)}
                title={r.title ?? ""}
                content={r.introduction ?? ""}
                author={r.authorName ?? ""}
                rate={r.score ?? -1}
                image={"https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"}
              />
            ))
        )}
      </Box>
    </Container>
  );
};
export default withLoading(Reviews, { reviews: loadAllReviews });
