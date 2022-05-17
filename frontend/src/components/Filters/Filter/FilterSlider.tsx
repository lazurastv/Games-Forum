import React from "react";
import { Typography, Slider } from "@mui/material";
import { Box } from "@mui/system";
import { sliderConf } from "../filterConf";
interface FilterSliderProps {
  year: number[];
  handleSliderChange: any;
  label: string;
}
export default function FilterSlider({ year, handleSliderChange, label }: FilterSliderProps) {
  return (
    <div>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Typography
          sx={{
            minWidth: "fit-content",
            fontSize: "20px",
            fontWeight: 300,
          }}
        >
          {label}
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
        min={sliderConf.yearRange[0]}
        max={sliderConf.yearRange[1]}
        onChange={handleSliderChange}
        disableSwap
      />
    </div>
  );
}
