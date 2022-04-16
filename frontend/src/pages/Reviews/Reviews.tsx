import Container from '@mui/material/Container';
import ReviewItem from './ReviewItem'
import { useEffect, useState } from "react";
import { ReviewControllerApi } from '../../api/api/apis/ReviewControllerApi';
import { ReviewVM } from '../../api/api/models/ReviewVM';

const Reviews = () => {
  const [reviewsArray, setReviewsArray] = useState<ReviewVM[]>([]);
  const reviews = new ReviewControllerApi();
  useEffect(() => {
    reviews
      .getAllReviews()
      .then((result) => {
        setReviewsArray(result);
      })
      .catch((error) => console.error("Read" + error));
  });
  return (
    <Container maxWidth="xl">
      {reviewsArray.map((r, idx) => (
        <ReviewItem
          key={idx}
          date={(r.publishDate as Date).toLocaleString().replace('/', '.').split(',')[0]}
          title={r.title as string}
          content={"xd"}
          author={r.authorName as string}
          rate={6}
          image={
            "https://cdn.mos.cms.futurecdn.net/3ZbPC5LNRVccsePfX2PbM7-1200-80.jpg"
          }
        />
      ))}
    </Container>
  );
};
export default Reviews;