import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const DatePicker = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& input::-webkit-calendar-picker-indicator": {
      filter:
        "invert(60%) sepia(33%) saturate(5275%) hue-rotate(12deg) brightness(94%) contrast(83%)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
export default DatePicker;
