import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Rate from "./Rate";
import Details from "./Details";
import Header from "./Header";
import AccordionGroup from "./AccordionGroup";
export default function Game() {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        <Grid container sx={{ flexWrap: "wrap-reverse", mb: 6 }}>
          <Grid item xs={12} md={8} sx={{
            pr: {
              xs: 0,
              md: 15,
            }
          }}>
            <Typography sx={{ textAlign: "left", fontSize: "20px" }}>
              Cyberpunk 2077 to najbardziej oczekiwana gra ostatnich
              lat. Stworzony przez rodzime studio CD Projekt RED erpeg
              akcji wzbudził ogromne zainteresowanie na długo przed
              premierą.


              Tym większe było rozczarowanie, gdy okazało się, że
              produkcja trafiła na rynek niedokończona, z
              wybrakowanymi mechanikami (opisywanymi w
              zapowiedziach), licznymi błędami i rażąco niską liczbą
              klatek na sekundę na konsolach starej generacji.


              Z racji tego, że historia V, osadzona w tętniącym życiem
              Night City, naszym zdaniem w ogóle nie powinna trafić na
              PlayStation 4 i Xboksy One (jest po prostu zbyt wymagająca
              technicznie, jak na możliwości tych sprzętów), zebraliśmy
              oceny dotyczące wyłącznie wersji pecetowej. O wydaniu
              next genowym nie wspominamy ani słowem, gdyż
              czekamy na wydanie zapowiadanej przez CD Projekt RED
              aktualizacji, która przede wszystkim ma wprowadzić
              oprawę graficzną na nowy poziom.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} >
            <Rate sx={{ position: "relative", mb: 5 }} rating={rating} setRating={setRating} />
            <Details sx={{ mb: 5 }} producer="CD Project" publisher="CD Project RED" date="20 marca 2021" />
          </Grid>
        </Grid>
        <AccordionGroup />
      </Container>
    </Box>
  );
}
