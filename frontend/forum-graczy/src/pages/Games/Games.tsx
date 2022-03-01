import {
  Container,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Pagination,
  Slider,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import GameTile from "../../components/Tile/GameTile";
import { games } from "../../data-mock/games";
import { styled } from "@mui/material/styles";
import SectionHeader from "../../components/SectionHeader";
const checkboxGroup = [
  {
    name: "Gatunek",
    checkboxLabels: [
      "Akcji",
      "RPG",
      "Strategiczne",
      "Sportowe",
      "Przygodowe",
      "MMO",
      "Zręcznościowe",
      "Symulacje",
    ],
  },
  {
    name: "Platforma",
    checkboxLabels: ["PC", "XBOX 360", "PS4", "XBOX ONE", "Switch"],
  },
  {
    name: "Dystrybucja cyfrowa",
    checkboxLabels: ["Steam", "Epic Games", "Origin", "Uplay"],
  },
];
const FilterInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
export default function Games() {
  const [searchValue, setSearchValue] = useState("");
  const [year, setYear] = useState<number[]>([1990, 2022]);
  const [checkedState, setCheckedState] = useState<{ [key: string]: any }>(
    checkboxGroup.reduce(
      (a, v) => ({
        ...a,
        [v.name]: v.checkboxLabels.reduce((a, v) => ({ ...a, [v]: false }), {}),
      }),
      {}
    )
    // checkboxGroup.map((group) => ({

    //   name: group.name,
    //   checkbox: group.checkboxLabels.map((checkboxLabel) => ({
    //     label: checkboxLabel,
    //     isChecked: false,
    //   })),
    // }))
  );
  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
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
  // const handleCheckboxChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   groupName: string
  // ) => {
  //   setCheckedState(() => {
  //     var checkbox = checkedState
  //       .find((group) => group.name == groupName)
  //       ?.checkbox.find((checkbox) => checkbox.label == event.target.name);
  //     if (checkbox) {
  //       checkbox.isChecked = event.target.checked;
  //     }
  //     return checkedState;
  //   });
  // };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    groupName: string
  ) => {
    setCheckedState({
      ...checkedState,
      [groupName]: {
        ...checkedState[groupName],
        [event.target.name]: event.target.checked,
      },
    });
  };
  console.log(
    JSON.stringify(
      { search: searchValue, year: year, booleanFilters: checkedState },
      null,
      4
    )
  );
  // );
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <SectionHeader>Gry</SectionHeader>
      <Box sx={{ mb: 4, textAlign: "left" }}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FilterListIcon />}
          >
            Filtruj
          </Button>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <FilterInput
              placeholder="WYSZUKAJ"
              color="secondary"
              sx={{
                mt: 3,
                width: "100%",
              }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "secondary.main" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                sx={{
                  minWidth: "fit-content",
                  fontSize: "20px",
                  fontWeight: 300,
                }}
              >
                ROK PREMIERY:
              </Typography>
              <Typography
                sx={{
                  minWidth: "fit-content",
                  fontSize: "20px",
                  ml: 1,
                }}
              >
                {year[0]} - {year[1]}
              </Typography>
            </Box>
            <Slider
              color="secondary"
              value={year}
              min={1970}
              max={2022}
              onChange={handleSliderChange}
              disableSwap
            />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            {checkboxGroup.map((group) => (
              <FormControl
                key={group.name}
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">
                  <Typography sx={{ color: "text.secondary" }}>
                    {group.name}
                  </Typography>
                </FormLabel>
                <FormGroup>
                  {group.checkboxLabels.map((checkboxLabel) => (
                    <FormControlLabel
                      key={checkboxLabel}
                      control={
                        <Checkbox
                          color="secondary"
                          name={checkboxLabel}
                          onChange={(e) => handleCheckboxChange(e, group.name)}
                        />
                      }
                      label={checkboxLabel}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {[...Array(2)].map((x, i) =>
          games.map((game, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <GameTile
                title={game.title}
                src={game.src}
                author={game.author}
                date={game.date}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Pagination count={10} color="secondary" />
    </Container>
  );
}
