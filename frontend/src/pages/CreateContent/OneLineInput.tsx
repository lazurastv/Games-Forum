import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";

export default function OneLineInput(props: any) {
  return (
    <FormControl
      sx={{
        mb: 1,
        display: "block",
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "secondary.dark",
          },
          "&.Mui-focused fieldset": {
            borderColor: "secondary.main",
          },
        },
      }}
    >
      <InputLabel color="secondary" id={props.label}>
        {props.label}
      </InputLabel>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <OutlinedInput
          required
          placeholder={props.placeholder ? props.placeholder : undefined}
          label={props.label}
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
