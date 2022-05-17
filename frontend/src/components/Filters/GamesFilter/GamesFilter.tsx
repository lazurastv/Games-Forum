import { Box, Checkbox, FormControlLabel, FormGroup, FormControl } from "@mui/material";
import { useState } from "react";
import Filter from "../Filter/Filter";
import CollapseButton from "../../CollapseButton";
import { game } from "../../../dictionary/gameDataDictionary";
const checkboxGroup = [
  {
    name: "Gatunek",
    checkboxLabels: game.genre,
  },
  {
    name: "Platforma",
    checkboxLabels: game.platform,
  },
  {
    name: "Dystrybucja cyfrowa",
    checkboxLabels: game.dystribution,
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
    <Filter {...props} otherFilters={{ booleanFilters: checkedState }} clearOtherFilters={handleClearCheckboxes}>
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
