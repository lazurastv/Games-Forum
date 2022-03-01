import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Rate from "./Rate";
import Details from "./Details";
import AccordionGroup from "./AccordionGroup";
import HeaderTile from "../../components/Tile/HeaderTile";
import SectionHeader from "../../components/SectionHeader";
import Carousel from "../../components/Carousel/Carousel";
import { gamesCarousel, reviewsCarousel } from "../../data-mock/carousels";
import GameTile from "../../components/Tile/GameTile";
import ReviewTile from "../../components/Tile/ReviewTile";
export default function Game() {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <Box>
      <HeaderTile
        title="Cyberpunk 2077"
        imgSrc="https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg"
        caption={
          <Grid container spacing={2} sx={{ color: "staticText.secondary" }}>
            <Grid item xs={12} md={4} sx={{ textAlign: "left", marginTop: "auto" }}>
              CD-Project Red
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
              RPG, fabularna, science-fiction
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
                    fontSize: "24px",
                    fontWeight: 700,
                    display: "inline-block",
                    py: 1,
                    px: 1.5,
                    ml: 1,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderRadius: "10px",
                  }}
                >
                  7/10
                </Typography>
              </Box>
              <Box>
                Ocena użytkowników:
                <Typography
                  sx={{
                    color: "staticText.primary",
                    fontSize: "24px",
                    fontWeight: 700,
                    display: "inline-block",
                    py: 1,
                    px: 1.5,
                    ml: 1,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderRadius: "10px",
                  }}
                >
                  8.24
                </Typography>
              </Box>
            </Grid>
          </Grid>
        }
      />
      <Container maxWidth="xl">
        <Grid container sx={{ flexWrap: "wrap-reverse", mb: 6 }}>
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
              Cyberpunk 2077 to najbardziej oczekiwana gra ostatnich lat. Stworzony przez rodzime studio CD Projekt RED
              erpeg akcji wzbudził ogromne zainteresowanie na długo przed premierą. Tym większe było rozczarowanie, gdy
              okazało się, że produkcja trafiła na rynek niedokończona, z wybrakowanymi mechanikami (opisywanymi w
              zapowiedziach), licznymi błędami i rażąco niską liczbą klatek na sekundę na konsolach starej generacji. Z
              racji tego, że historia V, osadzona w tętniącym życiem Night City, naszym zdaniem w ogóle nie powinna
              trafić na PlayStation 4 i Xboksy One (jest po prostu zbyt wymagająca technicznie, jak na możliwości tych
              sprzętów), zebraliśmy oceny dotyczące wyłącznie wersji pecetowej. O wydaniu next genowym nie wspominamy
              ani słowem, gdyż czekamy na wydanie zapowiadanej przez CD Projekt RED aktualizacji, która przede wszystkim
              ma wprowadzić oprawę graficzną na nowy poziom.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Rate sx={{ position: "relative", mb: 5 }} rating={rating} setRating={setRating} />
            <Details sx={{ mb: 5 }} producer="CD Project" publisher="CD Project RED" date="20 marca 2021" />
          </Grid>
        </Grid>
        <AccordionGroup />

        <SectionHeader>Podobne gry</SectionHeader>
        <Carousel>
          {gamesCarousel.map((gameTile) => (
            <GameTile title={gameTile.title} src={gameTile.src} author={gameTile.author} date={gameTile.date} />
          ))}
        </Carousel>
        <SectionHeader>Najnowsze recenzje</SectionHeader>
        <Carousel>
          {reviewsCarousel.map((reviewTile) => (
            <ReviewTile
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
