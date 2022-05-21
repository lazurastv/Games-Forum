import React from "react";
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useSessionContext } from "../../../Authentication/SessionContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArticleIcon from "@mui/icons-material/Article";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import FeedIcon from "@mui/icons-material/Feed";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Logout } from "@mui/icons-material";
import { styled } from "@mui/system";
import MenuItemLink from "./MenuItemLink";
import MenuCollapse from "./MenuCollapse";
const AddIcon = <AddCircleIcon sx={{ mr: 2, ml: -1, width: 24, height: 24 }} />;
const notLoggedItems = [
  {
    jsxElement: undefined,
    path: "/logowanie",
    text: "Logowanie",
  },
  {
    jsxElement: undefined,
    path: "/rejestracja",
    text: "Rejestracja",
  },
];
const collapseButtons = [
  {
    path: "/dodaj/artykul",
    text: "Artykuł",
    jsxElement: <ArticleIcon />,
  },
  {
    path: "/dodaj/recenzj",
    text: "Recenzję",
    jsxElement: <ReviewsIcon />,
  },
  {
    path: "/dodaj/gra",
    text: "Grę",
    jsxElement: <VideogameAssetIcon />,
  },
];
const NGINX_URL = process.env.REACT_APP_NGINX_USER;
export default function AccountMenu({ anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);
  const { session, logout } = useSessionContext();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    logout();
  };

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={menuPaperProps}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {session.isAuthenticated ? (
        <Box>
          <Box>
            <MenuItemLink
              onClick={handleClose}
              jsxElement={
                <Avatar
                  src={`${NGINX_URL}/${session.user?.profilePicturePath}/profile.png`}
                  sx={{ mr: 2, ml: -1, width: 32, height: 32 }}
                />
              }
              path="/profil"
              text={session.user?.username ?? "unknown"}
            />
            <Divider key="divider" sx={{ my: 1 }} />
          </Box>
          <Box>
            <MenuItemLink onClick={handleClose} jsxElement={<FeedIcon/>} path="/" text="Moje wpisy" />
            <Divider key="divider" sx={{ my: 1 }} />
          </Box>
          <MenuCollapse icon={AddIcon} name="Dodaj">
            {collapseButtons.map((b, idx) => (
              <Box key={idx}>
                <MenuItemLink onClick={handleClose} jsxElement={b.jsxElement} path={b.path} text={b.text} />
                <Divider key="divider" sx={{ my: 1 }} />
              </Box>
            ))}
          </MenuCollapse>
          <MenuItem key="logout" onClick={logoutHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Wyloguj
          </MenuItem>
        </Box>
      ) : (
        notLoggedItems.map((item, idx) => (
          <MenuItemLink
            onClick={handleClose}
            key={idx}
            jsxElement={item.jsxElement}
            path={item.path}
            text={item.text}
          />
        ))
      )}
    </StyledMenu>
  );
}
const menuPaperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 0.5,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "primary.main",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};
const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.primary.main,
    width: 175,
  },
}));
