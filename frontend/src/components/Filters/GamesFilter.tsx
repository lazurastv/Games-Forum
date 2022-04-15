import { Box, Checkbox, FormControlLabel, FormGroup, FormControl } from "@mui/material";
import { useState } from "react";
import Filter from "./Filter";
import CollapseButton from "../CollapseButton";
const checkboxGroup = [
  {
    name: "Gatunek",
    checkboxLabels: ["Akcji", "RPG", "Strategiczne", "Sportowe", "Przygodowe", "MMO", "Zręcznościowe", "Symulacje"],
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
const checkedStateInitial = checkboxGroup.reduce(
  (a, v) => ({
    ...a,
    [v.name]: v.checkboxLabels.reduce((a, v) => ({ ...a, [v]: false }), {}),
  }),
  {}
);
export default function GamesFilter(props: any) {
  const [checkedState, setCheckedState] = useState<{ [key: string]: any }>(checkedStateInitial);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, groupName: string) => {
    setCheckedState({
      ...checkedState,
      [groupName]: {
        ...checkedState[groupName],
        [event.target.name]: event.target.checked,
      },
    });
  };
  const handleClearCheckboxes = () => {
    setCheckedState(checkedStateInitial);
  };
  return (
    <Filter otherFilters={{ booleanFilters: checkedState }} clearOtherFilters={handleClearCheckboxes} page={props.page}>
      <Box>
        {checkboxGroup.map((group) => (
          <FormControl sx={{ display: "flex" }} key={group.name} variant="standard">
            <CollapseButton name={group.name}>
              <FormGroup>
                {group.checkboxLabels.map((checkboxLabel) => (
                  <FormControlLabel
                    key={checkboxLabel}
                    control={
                      <Checkbox
                        color="secondary"
                        name={checkboxLabel}
                        checked={checkedState[group.name][checkboxLabel]}
                        onChange={(e) => handleCheckboxChange(e, group.name)}
                      />
                    }
                    label={checkboxLabel}
                  />
                ))}
              </FormGroup>
            </CollapseButton>
          </FormControl>
        ))}
      </Box>
    </Filter>
  );
}
