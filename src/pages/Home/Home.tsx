import { Container } from "@mui/material";
import SectionHeader from "../../components/SectionHeader";
import LatestReviews from "./LatestReviews";
import SampleGames from "./SampleGames";
import TopNews from "./TopNews";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <TopNews />
      <SectionHeader>Najnowsze recenzje</SectionHeader>
      <LatestReviews />
      <SectionHeader>Gry</SectionHeader>
      <SampleGames />
    </Container>
  );
}