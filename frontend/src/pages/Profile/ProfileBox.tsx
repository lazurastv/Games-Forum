import { Avatar, Button, MenuItem, Select } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import { useSessionContext } from "../../components/Authentication/SessionContext";

interface IProfileBox {
  username: string;
  role: string;
  image: string;
  banned: boolean;
}

export default function ProfileBox(props: IProfileBox) {
  const usernameFontSize = { xs: 24, sm: 32, md: 30 };
  const roleFontSize = { xs: 16, sm: 18, md: 18 };
  const imageSize = { xs: 150, sm: 250, md: 250 };
  const profileBoxWidth = { xs: "auto", sm: "auto", md: 500 };

  const session = useSessionContext().session.user;
  const isSessionProfile = session?.username === props.username;
  const isAdmin = session?.role === "ADMIN";

  const [selectedRole, setSelectedRole] = useState(props.role);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "primary.main",
        color: "text.primary",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 2,
        height: "auto",
        width: { ...profileBoxWidth },
        p: 3,
      }}
    >
      <Avatar
        alt={props.username}
        src={props.image}
        sx={{
          height: "auto",
          width: { ...imageSize },
        }}
      />
      <Box sx={{ mt: 2, fontSize: { ...usernameFontSize } }}>{props.username}</Box>
      <Box color="text.secondary" sx={{ mt: 1, fontSize: { ...roleFontSize } }}>
        {props.role}
      </Box>
      <Box display="flex" justifyContent="center" sx={{ flexDirection: "column", mt: 2, width: "100%", gap: "10px" }}>
        {
          isSessionProfile &&
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Input accept="image/*" multiple type="file" />
            <Button variant="contained" component="span" color="secondary" sx={{ width: "45%" }}>
              Dodaj zdjęcie
            </Button>
            <Button
              disableElevation
              variant="outlined"
              color="secondary"
              sx={{
                color: "text.primary",
                borderColor: "secondary.main",
                width: "45%",
              }}
            >
              Zmień hasło
            </Button>
          </div>
        }
        {
          isAdmin &&
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button
              variant="contained"
              color="warning"
              sx={{
                borderColor: "secondary.main",
                width: "45%",
              }}
            >
              Usuń użytkownika
            </Button>
            {
              props.banned ?
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    borderColor: "secondary.main",
                    width: "45%",
                  }}
                >
                  Odbanuj użytkownika
                </Button> :
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    borderColor: "secondary.main",
                    width: "45%",
                  }}
                >
                  Zbanuj użytkownika
                </Button>
            }
          </div>
        }
        {
          isAdmin &&
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Select
              value={selectedRole}
              onChange={(val) => setSelectedRole(val.target.value)}
              sx={{ width: "45%", height: "36.5px", textAlign: "center" }}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="EDITOR">EDITOR</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="warning"
              sx={{
                borderColor: "secondary.main",
                width: "45%",
              }}
            >
              Zmień rolę
            </Button>
          </div>
        }
      </Box>
    </Box >
  );
}
const Input = styled("input")({
  display: "none",
});
