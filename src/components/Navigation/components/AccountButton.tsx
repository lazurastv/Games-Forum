import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import { useSessionContext } from "../../Authentication/SessionContext";
import AccountMenu from "./AccountMenu/AccountMenu";
const NGINX_URL = process.env.REACT_APP_USER;

export default function AccountButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { session } = useSessionContext();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
            <IconButton size="large" onClick={handleClick} sx={{ mx: 1 }}>
              <Avatar
                alt={session.user?.username}
                src={`${NGINX_URL}/${session.user?.profilePicturePath}/profile.jpg`}
                sx={{ width: 28, height: 28 }}
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
      <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
}
