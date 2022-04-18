import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
}
export default function MultipleSelect({ names, label }: MultipleSelectProps) {
  const [selectValues, setSelectValues] = React.useState<string[]>([names[0]]);

  const handleChange = (event: SelectChangeEvent<typeof selectValues>) => {
    const {
      target: { value },
    } = event;
    setSelectValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ flex: 1, mb: 1.5 }}>
      <InputLabel shrink color="secondary" id={label}>
        {label}
      </InputLabel>
      <Select
        color="secondary"
        labelId={label}
        multiple
        value={selectValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox
              color="secondary"
              checked={selectValues.indexOf(name) > -1}
            />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
