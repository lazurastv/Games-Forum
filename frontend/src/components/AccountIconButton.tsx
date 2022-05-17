import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useSessionContext } from "./Authentication/SessionContext";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Divider, ListItemIcon, SvgIconTypeMap } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
const menuButtons = [
  {
    path: "/mojprofil",
    text: "Mój profil",
    jsxElement: <Avatar sx={{ mr: 2, ml: -1, width: 24, height: 24 }} />,
  },
  {
    path: "/dodaj/artykul",
    text: "Artykuł",
    jsxElement: AddIcon,
  },
  {
    path: "/dodaj/recenzja",
    text: "Recenzja",
    jsxElement: AddIcon,
  },
  {
    path: "/dodaj/gra",
    text: "Gra",
    jsxElement: AddIcon,
  },
];
interface IMenuItemLink {
  jsxElement?: JSX.Element | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string });
  path: string;
  text: string;
}

function MenuItemLink(props: IMenuItemLink) {
  return (
    <Link to={props.path} style={{ textDecoration: "none" }}>
      <MenuItem sx={{ color: "text.primary", justifyContent: "flex-start" }}>
        <ListItemIcon>{props.jsxElement}</ListItemIcon>
        {props.text}
      </MenuItem>
    </Link>
  );
}

export default function AccountIconButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { session, logout } = useSessionContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {session.loading === undefined || session.loading === true ? (
          <Box sx={{ padding: 1 }}>
            <Avatar sx={{ width: 24, height: 24 }} />
          </Box>
        ) : session.isAuthenticated ? (
          <Tooltip title="Twój profil">
            <IconButton onClick={handleClick}>
              <Avatar
                src={"https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png"}
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="zaloguj/zarejestruj się">
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "primary.main",
            width: 140,
          },
        }}
        PaperProps={{
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
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {session.isAuthenticated ? (
          <Box>
            {menuButtons.map((b, idx) => (
              <Box key={idx}>
                <MenuItemLink jsxElement={b.jsxElement} path={b.path} text={b.text} />
                <Divider key="divider" sx={{ my: 1 }} />
              </Box>
            ))}

            <MenuItem key="logout" onClick={logoutHandler}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Wyloguj
            </MenuItem>
          </Box>
        ) : (
          notLoggedItems.map((item, idx) => (
            <MenuItemLink key={idx} jsxElement={item.jsxElement} path={item.path} text={item.text} />
          ))
        )}
      </Menu>
    </>
  );
}
