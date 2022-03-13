import { Button, Collapse, Divider, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { Box } from "@mui/system";
export default function CollapseButton(props: any) {
  const [inCollapse, setInCollapse] = useState<boolean | undefined>(false);
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        fullWidth
        disableRipple
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={() => setInCollapse(!inCollapse)}
      >
        <Typography variant="button" sx={{ color: "text.secondary", fontSize: "16px" }}>
          {props.name}
        </Typography>
        {inCollapse ? <KeyboardArrowUpIcon color="secondary" /> : <KeyboardArrowDownIcon color="secondary" />}
      </Button>
      <Divider sx={{ mb: 1, borderColor: "secondary.dark", opacity: ".8" }} />
      <Collapse in={inCollapse} sx={{ ml: 2 }}>
        {props.children}
      </Collapse>
    </Box>
  );
}
