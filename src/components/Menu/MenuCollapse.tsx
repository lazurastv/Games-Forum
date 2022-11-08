import React, { useState } from "react";
import { Collapse, Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
interface MenuCollapseProps {
  children?: React.ReactNode;
  name: string;
  icon?: React.ReactNode;
}
export default function MenuCollapse(props: MenuCollapseProps) {
  const [inCollapse, setInCollapse] = useState<boolean | undefined>(false);
  return (
    <Box className="MenuCollapse">
      <MenuItem onClick={() => setInCollapse(!inCollapse)} sx={{ color: "text.primary", justifyContent: "flex-start" }}>
        {/* <ListItemIcon sx={{ color: "secondary.main" }}>{props.icon}</ListItemIcon> */}
        <ListItemIcon sx={{ color: "secondary.main" }}></ListItemIcon>
        <ListItemText> {props.name}</ListItemText>
        {inCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </MenuItem>
      <Divider sx={{ mb: 1 }} />
      <Collapse in={inCollapse}>{props.children}</Collapse>
    </Box>
  );
}
