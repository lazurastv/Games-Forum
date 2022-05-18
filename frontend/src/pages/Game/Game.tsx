import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Rate from "./Rate";
import Details from "./Details";
import CollapsedInfo from "./CollapsedInfo";
import HeaderTile from "../../components/Tile/HeaderTile";
import SectionHeader from "../../components/SectionHeader";
import Carousel from "../../components/Carousel/Carousel";
import { reviewsCarousel } from "../../data-mock/carousels";
import ReviewTile from "../../components/Tile/ReviewTile";
import withLoading from "../../fetchData/withLoading";
import { loadGame } from "../../fetchData/fetchGames";
import { stringToHtml } from "../../utils/dataConversion";
import SimilarGames from "./SimilarGames";
import { RatingControllerApi, GameFullInfoVM, RatingVM } from "../../api/api";
import { convertDate } from "../../utils/convertDate";
import { useSessionContext } from "../../components/Authentication/SessionContext";
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
  const { session } = useSessionContext();
  const [rating, setRating] = useState<number | null>(null);
  // fetch rating on component load
  useEffect(() => {
    const ratingApi = new RatingControllerApi();
    if (session.user?.id) {
      ratingApi.getRatingByUserId({ id: session.user?.id }).then((res) => {
        if (res.length) {
          let r = res.find((v) => v.gameId === game.id)?.value;
          Number.isInteger(r) && r ? setRating(r) : setRating(null);
        }
      });
    }
  }, [session.user?.id, game.id]);

  // update rating in database
  const handleRateGame = (rate: number | null) => {
    const ratingApi = new RatingControllerApi();
    setRating(rate);
    if (session.user?.id) {
      ratingApi.getRatingByUserId({ id: session.user?.id }).then((res) => {
        let r = res.find((v) => v.gameId === game.id);
        let isInDb = res.length && r;
        if (!isInDb && rate !== null) {
          return ratingApi.addRating(
            { ratingAdd: { gameId: game.id, value: rate } },
            { credentials: "include" }
          );
        }
        if (isInDb && rate !== null) {
          return ratingApi.updateRating(
            { id: r?.id as number, ratingUpdate: { value: rate } },
            { credentials: "include" }
          );
        }
        if (isInDb && rate === null) {
          return ratingApi.deleteRating({ id: r?.id as number }, { credentials: "include" });
        }
      });
    }
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
                    {v}
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
              <Box sx={{ mb: 1 }}>
                <p style={{ display: "inline-block", minWidth: 175 }}>Ocena redakcji:</p>
                <Typography
                  sx={{
                    color: "secondary.main",
                    ...styles.score,
                  }}
                >
                  {game.userScore && isNaN(game.userScore) ? "?" : game.userScore?.toFixed(0)}/10
                </Typography>
              </Box>
              <Box>
                <p style={{ display: "inline-block", minWidth: 175 }}>Ocena użytkowników:</p>
                <Typography
                  sx={{
                    color: "staticText.primary",
                    ...styles.score,
                  }}
                >
                  {game.userScore && isNaN(game.userScore) ? "?" : game.userScore?.toFixed(2)}
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
