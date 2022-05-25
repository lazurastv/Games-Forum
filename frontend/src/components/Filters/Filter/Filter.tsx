import React, { useEffect, useState } from "react";
import { Box, Button, Grid, InputAdornment, MenuItem, Collapse, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { sliderConf, sortValues } from "./Filter.conf";
import FilterSlider from "./FilterSlider";
import { FilterProps } from "./Filter.types";
import { filterData, sortData } from "./Filter.utils";
import { ContentData } from "../../../pages/ApiData.types";
export default function Filter<T extends ContentData>(props: FilterProps<T>) {
  const {
    data,
    sliderLabel,
    setSortOrder,
    setLoading,
    setIdxToFilter,
    children,
    otherFilters,
    clearOtherFilters,
    page,
  } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const [year, setYear] = useState<number[]>(sliderConf.yearRange);
  const [filterInCollapse, setFilterInCollapse] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>(sortValues.popularityDescending.value);
  useEffect(() => {
    setSortOrder(sortData(data, sortValue));
  }, [sortValue, data, setSortOrder]);
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
    if (clearOtherFilters) {
      clearOtherFilters();
    }
    setFilterInCollapse(false);
    setLoading(true);
    setIdxToFilter([]);
    setTimeout(() => setLoading(false), 500);
  };
  const handleChangeSort = (event: { target: { value: string } }) => {
    if (event.target.value !== sortValue) {
      setSortValue(event.target.value);
    }
  };
  const handleSubmitFilters = () => {
    setLoading(true);
    let newIdxToFilter: number[] = filterData(data, searchValue, year, otherFilters);
    setIdxToFilter(newIdxToFilter);
    setTimeout(() => setLoading(false), 500);
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
            handleSubmitFilters();
            e.preventDefault();
          }}
        >
          <Grid container spacing={4} sx={{ mb: 2 }}>
            {[
              <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />,
              <FilterSlider label={sliderLabel} year={year} handleSliderChange={handleSliderChange} />,
              children,
            ].map((gridElement, idx) => (
              <Grid key={idx} item xs={12} lg={6}>
                {gridElement}
              </Grid>
            ))}
          </Grid>
          <Grid container sx={{ mb: 1 }}>
            {[
              <></>,
              <Button sx={{ mb: 1 }} type="submit" color="secondary" variant="contained" size="large" fullWidth>
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
  <Button sx={{ minWidth: "32px" }} size="large" variant="contained" color="secondary" onClick={onClick}>
    <FilterListIcon sx={{ mr: { xs: 0, sm: 1 } }} />
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      Filtruj
    </Box>
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
    sx={{ minWidth: { xs: 0, md: "255px" } }}
    id="select"
    label="Sortuj"
    value={sortValue}
    onChange={handleChangeSort}
    select
  >
    {Object.entries(sortValues).map(([key, value]) => (
      <MenuItem key={key} value={value.value}>
        {value.text}
      </MenuItem>
    ))}
  </TextField>
);
const FilterWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(3),
  textAlign: "left",
}));
const FilterTopWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  justifyContent: "space-between",
  alignItems: "center",
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
