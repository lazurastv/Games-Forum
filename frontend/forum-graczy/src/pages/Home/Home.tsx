import { Container, Divider, Typography } from "@mui/material";
import TopNews from "./TopNews";
import ReviewTile from "../../components/Carousel/ReviewTile";
import Carousel from "../../components/Carousel/Carousel";
import GameTile from "../../components/Carousel/GameTile";
import { gamesCarousel, reviewsCarousel } from "../../data-mock/carousels";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <TopNews />
      <Typography variant="h4" gutterBottom sx={{ mt: 4, textAlign: "left", color: "secondary.main" }}>
        Najnowsze recenzje
      </Typography>
      <Divider sx={{ borderColor: "secondary.main" }} />
      <Carousel>
        {reviewsCarousel.map((reviewTile) =>
          <ReviewTile
            title={reviewTile.title}
            src={reviewTile.src}
            author={reviewTile.author}
            date={reviewTile.date}
          />
        )}
      </Carousel>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left", color: "secondary.main" }}>
        Gry
      </Typography>
      <Divider sx={{ borderColor: "secondary.main" }} />
      <Carousel>
        {gamesCarousel.map((gameTile) =>
          <GameTile
            title={gameTile.title}
            src={gameTile.src}
            author={gameTile.author}
            date={gameTile.date}
          />
        )}
      </Carousel>
    </Container>
  );
}
