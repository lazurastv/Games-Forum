import { Box, Checkbox, FormControlLabel, FormGroup, FormControl } from "@mui/material";
import { useState } from "react";
import Filter from "../Filter/Filter";
import CollapseButton from "../../CollapseButton";
import { game } from "../../../data-mock/gameDataDictionary";
const checkboxGroup = {
  genres: {
    text: "Gatunek",
    checkboxLabels: game.genre,
  },
  platforms: {
    text: "Platforma",
    checkboxLabels: game.platform,
  },
  distributions: {
    text: "Dystrybucja cyfrowa",
    checkboxLabels: game.dystribution,
  },
};
const checkedStateInitial = Object.entries(checkboxGroup).reduce(
  (a, [key, value]) => ({
    ...a,
    [key]: value.checkboxLabels.reduce((a, v) => ({ ...a, [v]: false }), {}),
  }),
  {}
);
export interface CheckboxFilters {
  genres: {
    [key: string]: boolean;
  };
  platforms: {
    [key: string]: boolean;
  };
  distributions: {
    [key: string]: boolean;
  };
}
export default function GamesFilter(props: any) {
  const [checkedState, setCheckedState] = useState<CheckboxFilters>(checkedStateInitial as CheckboxFilters);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, groupName: string) => {
    setCheckedState({
      ...checkedState,
      [groupName]: {
        ...checkedState[groupName],
        [e.target.name]: e.target.checked,
      },
    });
  };
  const handleClearCheckboxes = () => {
    setCheckedState(checkedStateInitial as CheckboxFilters);
  };
  return (
    <Filter {...props} otherFilters={checkedState} clearOtherFilters={handleClearCheckboxes}>
      <Box>
        {Object.entries(checkboxGroup).map(([key, value]) => (
          <FormControl sx={{ display: "flex" }} key={key} variant="standard">
            <CollapseButton name={value.text}>
              <FormGroup>
                {value.checkboxLabels.map((checkboxLabel) => (
                  <FormControlLabel
                    key={checkboxLabel}
                    control={
                      <Checkbox
                        color="secondary"
                        name={checkboxLabel}
                        checked={checkedState[key][checkboxLabel]}
                        onChange={(e) => handleCheckboxChange(e, key)}
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
