import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface MultipleSelectProps {
  names: Array<string>;
  label: string;
  values: Array<string>;
  setValues: React.Dispatch<React.SetStateAction<Array<string>>>;
}
export default function MultipleSelect({ names, label, values, setValues }: MultipleSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;
    setValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ flex: 1 }}>
      <InputLabel shrink color="secondary" id={label}>
        {label}
      </InputLabel>
      <Select
        color="secondary"
        displayEmpty
        labelId={label}
        multiple
        value={values}
        onChange={handleChange}
        input={
          <OutlinedInput
            notched
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.dark",
              },
              ".MuiOutlinedInput-root.Mui-focused": {
                borderColor: "secondary.main",
              },
            }}
            label={label}
          />
        }
        renderValue={(selected) => {
          if (!selected.length) {
            return <Typography color="text.secondary">{names[0] + ", " + names[1] + "..."}</Typography>;
          }
          return selected.join(", ");
        }}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox color="secondary" checked={values.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
