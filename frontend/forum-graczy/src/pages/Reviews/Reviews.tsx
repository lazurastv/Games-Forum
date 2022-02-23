import Container from '@mui/material/Container';
import ReviewItem from '../../ReviewItem';
import { reviews } from '../../data-mock/reviews';

const Reviews = () => {

  return (
    <Container maxWidth="xl">
      {reviews.map((r) =>
      <ReviewItem date={r.date} title={r.title} content={r.content} author={r.author} rate={r.rate} image={r.image}/>
      )}
    </Container>
  );
};
export default Reviews;