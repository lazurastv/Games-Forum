import { FormControl, OutlinedInput, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function OneLineInput(props: any) {
  return (
    <FormControl
      sx={{
        mb: props.noMargin ? 1 : 2,
        display: "block",
        "& .MuiOutlinedInput-root": {
          // "& fieldset": {
          //   borderColor: "primary.light",
          // },
          "&:hover fieldset": {
            borderColor: "secondary.dark",
          },
          "&.Mui-focused fieldset": {
            borderColor: "secondary.main",
          },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          color: "text.secondary",
          textAlign: "left",
          mb: 0.5,
        }}
      >
        {props.formLabel}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <OutlinedInput
          required
          placeholder={props.placeholder}
          color="secondary"
          fullWidth
          inputProps={{ minLength: 2, maxLength: 128 }}
          value={props.value}
          onChange={props.onChange}
        />
        {props.deleteButton}
      </Box>
    </FormControl>
  );
}
