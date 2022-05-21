import React from "react";
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const ITEM_HEIGHT = 48;
export default function EditMenu({ position = "right" }: { position?: "left" | "right" }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pos = position === "left" ? { left: 15 } : { right: 15 };
  return (
    <Box sx={{ position: "absolute", top: 15, ...pos, display: "flex", zIndex: 999 }}>
      <IconButton
        sx={{
          position: "relative",
          "&::after": {
            position: "absolute",
            content: "''",
            top: 0,
            left: 0,
            backgroundColor: "primary.main",
            opacity:.5,
            width: 50,
            height: 50,
            zIndex: -1,
            borderRadius: 200,
          },
        }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "edit-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="secondary" fontSize="large" />
      </IconButton>
      <Menu
        id="edit-menu"
        MenuListProps={{ "aria-labelledby": "edit-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "17ch",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edytuj</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Usuń</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
