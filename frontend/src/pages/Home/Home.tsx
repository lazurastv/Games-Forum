import { Container } from "@mui/material";
import TopNews from "./TopNews";
import ReviewTile from "../../components/Tile/ReviewTile";
import Carousel from "../../components/Carousel/Carousel";
import GameTile from "../../components/Tile/GameTile";
import { gamesCarousel, reviewsCarousel } from "../../data-mock/carousels";
import SectionHeader from "../../components/SectionHeader";
import LatestReviews from "./LatestReviews";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <TopNews />
      <SectionHeader>Najnowsze recenzje</SectionHeader>
      <LatestReviews />
      <SectionHeader>Gry</SectionHeader>
      {/* <Carousel>
        {gamesCarousel.map((gameTile, idx) => (
          <GameTile
            key={idx}
            title={gameTile.title}
            src={gameTile.src}
            author={gameTile.author}
            date={gameTile.date}
          />
        ))}
      </Carousel> */}
    </Container>
  );
}
