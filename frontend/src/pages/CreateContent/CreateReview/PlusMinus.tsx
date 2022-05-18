import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { green, red } from "@mui/material/colors";
import OneLineInput from "../OneLineInput";
import Label from "../Label";
const Plus = (props: any) => (
  <AddCircleOutlineIcon sx={{ mr: 1, color: green[500] }} />
);
const Minus = (props: any) => (
  <RemoveCircleOutlineIcon sx={{ mr: 1, color: red[500] }} />
);

export interface PlusMinusProps {
  pluses: Array<string>;
  minuses: Array<string>;
  setPluses: React.Dispatch<React.SetStateAction<string[]>>;
  setMinuses: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function PlusMinus({
  pluses,
  minuses,
  setPluses,
  setMinuses,
}: PlusMinusProps) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Label>Plusy</Label>
        {pluses.map((plus, idx) => (
          <Box key={"Plus" + idx} sx={{ alignItems: "center" }}>
            <OneLineInput
              value={pluses[idx]}
              onChange={(e: any) =>
                setPluses(
                  pluses.map((p, i) => (i === idx ? e.target.value : p))
                )
              }
              placeholder={"Plus " + (idx + 1)}
              startAdornment={<Plus />}
              deleteButton={
                <IconButton
                  sx={{ ml: 0.5 }}
                  onClick={() =>
                    pluses.length > 1
                      ? setPluses(pluses.filter((m, i) => i !== idx || i === 0))
                      : setPluses([""])
                  }
                  size="small"
                >
                  <DeleteForeverIcon
                    sx={{ color: red[700] }}
                    fontSize="medium"
                  />
                </IconButton>
              }
            />
          </Box>
        ))}
        {pluses.length < 5 && (
          <IconButton
            onClick={() => {
              setPluses([...pluses, ""]);
            }}
          >
            <AddCircleIcon color="secondary" fontSize="large" />
          </IconButton>
        )}
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Label>Minusy</Label>
        {minuses.map((plus, idx) => (
          <OneLineInput
            key={"Minus" + idx}
            value={minuses[idx]}
            onChange={(e: any) =>
              setMinuses(
                minuses.map((p, i) => (i === idx ? e.target.value : p))
              )
            }
            placeholder={"Minus " + (idx + 1)}
            startAdornment={<Minus />}
            deleteButton={
              <IconButton
                sx={{ ml: 0.5 }}
                onClick={() =>
                  minuses.length > 1
                    ? setMinuses(minuses.filter((m, i) => i !== idx || i === 0))
                    : setMinuses([""])
                }
                size="small"
              >
                <DeleteForeverIcon sx={{ color: red[700] }} fontSize="medium" />
              </IconButton>
            }
          />
        ))}
        {minuses.length < 5 && (
          <IconButton
            onClick={() => {
              setMinuses([...minuses, ""]);
            }}
          >
            <AddCircleIcon color="secondary" fontSize="large" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
