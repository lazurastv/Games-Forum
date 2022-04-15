import { Box, Container, Grid, Typography } from "@mui/material";
import Author from "../../components/Author";
import Carousel from "../../components/Carousel/Carousel";
import SectionHeader from "../../components/SectionHeader";
import ArticleTile from "../../components/Tile/ArticleTile";
import HeaderTile from "../../components/Tile/HeaderTile";
import { reviewsCarousel } from "../../data-mock/carousels";
export default function Article() {
  return (
    <Box>
      <HeaderTile
        title="Artykuł gry Cyberpunk 2077 - czy to najlepsza gra roku?"
        imgSrc="https://geex.x-kom.pl/wp-content/uploads/2020/01/wiedzmin-3-dziki-gon.jpg"
        caption={
          <Typography sx={{ textAlign: "right" }}>01.01.2022</Typography>
        }
      />
      <Container maxWidth="xl">
        <Grid container sx={{ flexWrap: "wrap-reverse", pb: 6 }}>
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
              Cyberpunk 2077 to najbardziej oczekiwana gra ostatnich lat.
              Stworzony przez rodzime studio CD Projekt RED erpeg akcji wzbudził
              ogromne zainteresowanie na długo przed premierą. Tym większe było
              rozczarowanie, gdy okazało się, że produkcja trafiła na rynek
              niedokończona, z wybrakowanymi mechanikami (opisywanymi w
              zapowiedziach), licznymi błędami i rażąco niską liczbą klatek na
              sekundę na konsolach starej generacji. Z racji tego, że historia
              V, osadzona w tętniącym życiem Night City, naszym zdaniem w ogóle
              nie powinna trafić na PlayStation 4 i Xboksy One (jest po prostu
              zbyt wymagająca technicznie, jak na możliwości tych sprzętów),
              zebraliśmy oceny dotyczące wyłącznie wersji pecetowej. O wydaniu
              next genowym nie wspominamy ani słowem, gdyż czekamy na wydanie
              zapowiadanej przez CD Projekt RED aktualizacji, która przede
              wszystkim ma wprowadzić oprawę graficzną na nowy poziom.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Author
              sx={{ mb: 5 }}
              producer="CD Project"
              publisher="CD Project RED"
              date="20 marca 2021"
            />
          </Grid>
        </Grid>
        <SectionHeader>Podobne artykuły</SectionHeader>
        <Carousel>
          {reviewsCarousel.map((articleTile) => (
            <ArticleTile
              title={articleTile.title}
              src={articleTile.src}
              author={articleTile.author}
              date={articleTile.date}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
