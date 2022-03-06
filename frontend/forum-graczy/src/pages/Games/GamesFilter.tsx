import {
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Divider,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import Filter from "../../components/Filters/Filter";
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
const checkboxInCollapseInitial = checkboxGroup.reduce(
  (a, v) => ({
    ...a,
    [v.name]: false,
  }),
  {}
);
export default function GamesFilter(props: any) {
  const [checkedState, setCheckedState] = useState<{ [key: string]: any }>(checkedStateInitial);
  const [checkboxInCollapse, setCheckboxInCollapse] = useState<{ [key: string]: any }>(checkboxInCollapseInitial);
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
    setCheckboxInCollapse(checkboxInCollapseInitial);
    setCheckedState(checkedStateInitial);
  };
  return (
    <Filter otherFilters={{ booleanFilters: checkedState }} clearOtherFilters={handleClearCheckboxes} page={props.page}>
      <Box>
        {checkboxGroup.map((group) => (
          <FormControl
            sx={{
              display: "flex",
              mb: 2,
            }}
            key={group.name}
            variant="standard"
          >
            <Button
              disableRipple
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() =>
                setCheckboxInCollapse({ ...checkboxInCollapse, [group.name]: !checkboxInCollapse[group.name] })
              }
            >
              <Typography variant="button" sx={{ color: "text.secondary", fontSize: "16px" }}>
                {group.name}
              </Typography>
              {checkboxInCollapse[group.name] ? (
                <KeyboardArrowUpIcon color="secondary" />
              ) : (
                <KeyboardArrowDownIcon color="secondary" />
              )}
            </Button>
            <Divider sx={{ mb: 1, borderColor: "secondary.dark", opacity: ".8" }} />

            <Collapse in={checkboxInCollapse[group.name]} sx={{ ml: 2 }}>
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
            </Collapse>
          </FormControl>
        ))}
      </Box>
    </Filter>
  );
}
