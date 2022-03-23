import { Container, Divider, Typography } from "@mui/material";
import TopNews from "./TopNews";
import ReviewTile from "../../components/Carousel/ReviewTile";
import Carousel from "../../components/Carousel/Carousel";
import GameTile from "../../components/Carousel/GameTile";
import { gamesCarousel, reviewsCarousel } from "../../data-mock/carousels";

import { ArticleAddUpdate } from "../../api/api/models";
import { ArticleControllerApi } from "../../api/api";

export default function Home() {
  const articles = new ArticleControllerApi();
  articles.login()
    .then(result => {
      console.log(result);
      const article = { 'title': 'Article 11', 'introduction': 'Hello', 'content': '<html><html/>' } as ArticleAddUpdate;
      articles.addArticle({ 'articleAddUpdate': article }, {
        credentials: 'include'
      })
        .then(result => {
          console.log('Add ' + result);
          articles.getAllArticles()
            .then(result => {
              result.forEach(x => console.log(x));
            })
            .catch(error => console.error('Read' + error));
        })
        .catch(error => console.error('Add ' + error));
    })
    .catch(
      error => console.error('Login ' + error)
    );
  return (
    <Container maxWidth="xl">``
      <TopNews />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left", color: "secondary.main" }}>
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
