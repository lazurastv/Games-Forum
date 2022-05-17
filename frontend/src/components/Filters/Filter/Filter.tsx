import { Box, Button, Grid, InputAdornment, MenuItem, Collapse, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { sliderConf } from "../filterConf";
import FilterSlider from "./FilterSlider";
import { FilterProps, PossibleData } from "./Filter.types";
import { filterData } from "./Filter.utils";
export default function Filter<T extends PossibleData>(props: FilterProps<T>) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [year, setYear] = useState<number[]>(sliderConf.yearRange);
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
    setYear(sliderConf.yearRange);
    if (props.clearOtherFilters) {
      props.clearOtherFilters();
    }
    if (props.setIdxToFilter) {
      props.setIdxToFilter([]);
    }
  };
  const handleChangeSort = (event: { target: { value: string } }) => {
    if (event.target.value !== sortValue) {
      onSearch();
      setSortValue(event.target.value);
    }
  };
  const onSearch = () => {
    let newIdxToFilter = filterData(props.data, searchValue);
    if (props.setIdxToFilter) {
      props.setIdxToFilter(newIdxToFilter as number[]);
    }
  };
  return (
    <FilterWrapper>
      <FilterTopWrapper>
        <FilterButton onClick={() => setFilterInCollapse(!filterInCollapse)} />
        <SortDropdown sortValue={sortValue} handleChangeSort={handleChangeSort} />
      </FilterTopWrapper>
      <Collapse in={filterInCollapse}>
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <Grid container spacing={4} sx={{ mb: 2 }}>
            {[
              <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />,
              <FilterSlider year={year} handleSliderChange={handleSliderChange} />,
              props.children,
            ].map((gridElement, idx) => (
              <Grid key={idx} item xs={12} lg={6}>
                {gridElement}
              </Grid>
            ))}
          </Grid>
          <Grid container sx={{ mb: 1 }}>
            {[
              <></>,
              <Button
                sx={{ mb: 1 }}
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                fullWidth
                onClick={onSearch}
              >
                Szukaj
              </Button>,
              <Box sx={{ textAlign: "end" }}>
                <Button color="secondary" onClick={handleClearFilters}>
                  Wyczyść filtry
                </Button>
              </Box>,
            ].map((gridElement, idx) => (
              <Grid key={idx} item xs={12} lg={4}>
                {gridElement}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>
    </FilterWrapper>
  );
}
const FilterButton = ({ onClick }) => (
  <Button size="large" variant="contained" color="secondary" startIcon={<FilterListIcon />} onClick={onClick}>
    Filtruj
  </Button>
);
const SearchBar = ({ searchValue, setSearchValue }) => (
  <SearchBarWrapper
    placeholder="WYSZUKAJ"
    color="secondary"
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
);
const SortDropdown = ({ sortValue, handleChangeSort }) => (
  <TextField
    color="secondary"
    sx={{ minWidth: "165px" }}
    id="select"
    label="Sortuj"
    value={sortValue}
    onChange={handleChangeSort}
    select
  >
    <MenuItem value="Alfabetycznie">Alfabetycznie</MenuItem>
    <MenuItem value="Popularność">Popularność</MenuItem>
    <MenuItem value="Od najnowszych">Od najnowszych</MenuItem>
    <MenuItem value="Od najstarszych">Od najstarszych</MenuItem>
  </TextField>
);
const FilterWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2),
  textAlign: "left",
}));
const FilterTopWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  height: "43px",
}));
const SearchBarWrapper = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
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
