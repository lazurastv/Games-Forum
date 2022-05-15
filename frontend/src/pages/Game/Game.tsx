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
import { RatingControllerApi, GameFullInfoVM } from "../../api/api";
import { convertDate } from "../../utils/convertDate";
import { AuthApi } from "../../api/api/apis/AuthApi";
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
function Game({ game }: { game: GameFullInfoVM }) {
  const [rating, setRating] = useState<number | null>(null);
  const auth = new AuthApi();
  const ratingApi = new RatingControllerApi();
  const handleRateGame = (rate: number | null) => {
    setRating(rate);
    if (rate === null) {
      auth
        .login()
        .then((res) =>
          ratingApi.deleteRating({ id: game.id as number }, { credentials: "include" })
        )
        .catch((err) => console.error(err));
    } else {
      auth
        .login()
        .then((res) =>
          ratingApi.addRating(
            { ratingAdd: { gameId: game.id, value: 10 } },
            { credentials: "include" }
          )
        )
        .catch((err) => console.error(err));
    }
    auth
      .login()
      .then((res) => ratingApi.getAllRatings())
      .then((res) => console.log(res));
  };
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
              {game.genres &&
                game.genres.map((v, idx) => (
                  <span key={idx}>
                    {gameDatafromDB(v)}
                    {game.genres && idx < game.genres.length - 1 ? ", " : ""}
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
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>
              {game.introduction}
            </Typography>
            {/* <Typography sx={{ textAlign: "left", fontSize: "20px" }}>{stringToHtml(game.path)}</Typography> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Rate sx={{ position: "relative", mb: 5 }} rating={rating} setRating={handleRateGame} />
            <Details
              sx={{ mb: 5 }}
              developer={game.developer}
              date={convertDate(game.gamePublishDate)}
            />
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
export default withLoading(Game, { game: loadGame });
