import { Container, Box, Button, Divider, Grid, InputAdornment, Pagination, Slider, TextField, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import GameTile from "../../components/Carousel/GameTile";
import { games } from "../../data-mock/games";

export default function Games() {
  const [year, setYear] = useState<number[]>([1990, 2022]);

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setYear([Math.min(newValue[0], year[1] - 1), year[1]]);
    } else {
      setYear([year[0], Math.max(newValue[1], year[0] + 1)]);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left", color: "secondary.main" }}>
        Gry
      </Typography>
      <Divider sx={{ borderColor: "secondary.main", color: "secondary.main", mb: 4 }} />
      <Box sx={{ mb: 1, textAlign: "left" }}>
        <Box sx={{ mb: 1 }}>
          <Button variant="contained" color="secondary" startIcon={<FilterListIcon />}>
            Filtruj
          </Button>
        </Box>
        <Box sx={{ display: "flex", flex: "3" }}>
          <TextField
            placeholder="WYSZUKAJ"
            color="secondary"
            sx={{
              'fieldset': {
                borderWidth: "2px",
                borderColor: "secondary.main",
              },
              'fieldset:hover': {
                borderColor: "secondary.main",
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "secondary.main" }} />
                </InputAdornment>
              ),
            }}
          />
          <Slider
            color="secondary"
            getAriaLabel={() => 'Minimum distance'}
            value={year}
            min={1970}
            max={2022}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            disableSwap
          />
        </Box>
      </Box>

      <Grid container spacing={2}>
        {[...Array(2)].map((x, i) =>
          games.map((game, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <GameTile
                title={game.title}
                src={game.src}
                author={game.author}
                date={game.date} />
            </Grid>
          ))
        )}
      </Grid>
      <Pagination count={10} color="secondary" />
    </Container>
  );
}
