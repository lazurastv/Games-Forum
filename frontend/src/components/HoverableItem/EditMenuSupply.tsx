import React from "react";
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItemLink from "../Menu/MenuItemLink";
const ITEM_HEIGHT = 48;
interface EditMenuSupplyProps {
  position?: "left" | "right";
  children: React.ReactNode;
  edit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}
export default function EditMenuSupply({ edit, position = "right", children, onDelete, onEdit }: EditMenuSupplyProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pos = position === "left" ? { left: 15 } : { right: 15 };
  return edit ? (
    <Box sx={{ position: "relative" }}>
      {children}
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
              opacity: 0.5,
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
          onClick={handleClose}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "17ch",
            },
          }}
        >
          <MenuItemLink path="/" jsxElement={<EditIcon fontSize="small" />} text="Edytuj" onClick={onEdit} />
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Usuń</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  ) : (
    <Box>{children}</Box>
  );
}
