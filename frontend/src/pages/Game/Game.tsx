import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Rate from "./Rate";
import Details from "./Details";
import CollapsedInfo from "./CollapsedInfo";
import HeaderTile from "../../components/Tile/HeaderTile";
import SectionHeader from "../../components/SectionHeader";
import Carousel from "../../components/Carousel/Carousel";
import { gamesCarousel, reviewsCarousel } from "../../data-mock/carousels";
import GameTile from "../../components/Tile/GameTile";
import ReviewTile from "../../components/Tile/ReviewTile";
import withLoading from "../../fetchData/withLoading";
import { loadGame } from "../../fetchData/fetchGames";
import { stringToHtml } from "../../utils/dataConversion";
import { gameDatafromDB } from "../../dictionary/mapData";
import SimilarGames from "./SimilarGames";
const styles = {
  score: {
    fontSize: "24px",
    fontWeight: 700,
    display: "inline-block",
    py: 1,
    px: 1.5,
    ml: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "10px",
  },
};
function Game({ data: game }) {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <Box>
      <HeaderTile
        title={game.title}
        imgSrc="https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg"
        caption={
          <Grid container spacing={2} sx={{ color: "staticText.secondary" }}>
            <Grid item xs={12} md={4} sx={{ textAlign: "left", marginTop: "auto" }}>
              {game.developer}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                textAlign: {
                  xs: "left",
                  md: "center",
                },
                marginTop: "auto",
              }}
            >
              {game.genres.map((v, idx) => (
                <span key={idx}>
                  {gameDatafromDB(v)}
                  {idx < game.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
                color: "staticText.primary",
                marginTop: "auto",
              }}
            >
              <Box>
                Ocena redakcji:
                <Typography
                  sx={{
                    color: "secondary.main",
                    ...styles.score,
                  }}
                >
                  {game.editorScore}/10
                </Typography>
              </Box>
              <Box>
                Ocena użytkowników:
                <Typography
                  sx={{
                    color: "staticText.primary",
                    ...styles.score,
                  }}
                >
                  {game.userScore}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        }
      />
      <Container maxWidth="xl">
        <Grid container sx={{ flexWrap: "wrap-reverse", mb: 3 }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              pr: {
                xs: 0,
                md: 15,
              },
            }}
          >
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>{game.introduction}</Typography>
            {/* <Typography sx={{ textAlign: "left", fontSize: "20px" }}>{stringToHtml(game.path)}</Typography> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Rate sx={{ position: "relative", mb: 5 }} rating={rating} setRating={setRating} />
            <Details sx={{ mb: 5 }} producer="CD Project" publisher="CD Project RED" date="20 marca 2021" />
          </Grid>
        </Grid>
        <CollapsedInfo platforms={game.platforms} distributions={game.distributions} />
        <SectionHeader>Podobne gry</SectionHeader>
        <SimilarGames />
        <SectionHeader>Najnowsze recenzje</SectionHeader>
        <Carousel>
          {reviewsCarousel.map((reviewTile) => (
            <ReviewTile
              key={reviewTile.title}
              title={reviewTile.title}
              src={reviewTile.src}
              author={reviewTile.author}
              date={reviewTile.date}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
export default withLoading(Game, async (fetchId: number) => await loadGame(fetchId));
