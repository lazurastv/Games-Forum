import {
  Box,
  Button,
  Select,
  Grid,
  InputAdornment,
  Slider,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Collapse,
  InputLabel,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { styled } from "@mui/material/styles";
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
const [minYear, maxYear] = [1990, 2022];
export default function Filter(props: any) {
  const [searchValue, setSearchValue] = useState("");
  const [year, setYear] = useState<number[]>([1990, 2022]);
  const [filterInCollapse, setFilterInCollapse] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>("Popularność");
  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setYear([Math.min(newValue[0], year[1] - 1), year[1]]);
    } else {
      setYear([year[0], Math.max(newValue[1], year[0] + 1)]);
    }
  };
  const handleClearFilters = () => {
    setSearchValue("");
    setYear([minYear, maxYear]);
    if (props.clearOtherFilters) {
      props.clearOtherFilters();
    }
  };
  const handleSort = (event: { target: { value: string } }) => {
    if (event.target.value !== sortValue) {
      onSearch();
      setSortValue(event.target.value);
    }
  };
  const onSearch = () => {
    console.log(
      JSON.stringify(
        { search: searchValue, year: year, page: props.page, ...props.otherFilters, sort: sortValue },
        null,
        4
      )
    );
  };
  return (
    <Box sx={{ mb: 6, textAlign: "left" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, height: "43px" }}>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<FilterListIcon />}
          onClick={() => setFilterInCollapse(!filterInCollapse)}
        >
          Filtruj
        </Button>
        <FormControl>
          <InputLabel id="demo-simple-select-label" color="secondary">
            Sortuj:
          </InputLabel>
          <Select
            sx={{
              minWidth: "165px",
            }}
            labelId="demo-simple-select-label"
            color="secondary"
            label="Sortuj:"
            value={sortValue}
            onChange={handleSort}
          >
            <MenuItem value="Alfabetycznie">Alfabetycznie</MenuItem>
            <MenuItem value="Popularność">Popularność</MenuItem>
            <MenuItem value="Od najnowszych">Od najnowszych</MenuItem>
            <MenuItem value="Od najstarszych">Od najstarszych</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Collapse in={filterInCollapse}>
        <Grid container spacing={4} sx={{ mb: 2 }}>
          <Grid item xs={12} lg={6}>
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
          <Grid item xs={12} lg={6}>
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
              sx={{ display: "block", width: "calc(100% - 20px)", mx: "auto" }}
              color="secondary"
              value={year}
              min={minYear}
              max={maxYear}
              onChange={handleSliderChange}
              disableSwap
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            {props.children}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={4} sx={{ mb: 1 }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() =>
                console.log(
                  JSON.stringify(
                    { search: searchValue, year: year, page: props.page, ...props.otherFilters, sort: sortValue },
                    null,
                    4
                  )
                )
              }
            >
              Szukaj
            </Button>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ textAlign: "end" }}>
            <Button color="secondary" onClick={handleClearFilters}>
              Wyczyść filtry
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
}
