import { Avatar, Button, MenuItem, Select } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import { UserControllerApi } from "../../api/api";
import { useSessionContext } from "../../components/Authentication/SessionContext";
import PasswordPopup from "./PasswordPopup";
import 'reactjs-popup/dist/index.css';
import { fromJS } from "immutable";

interface IProfileBox {
  id: number;
  username: string;
  role: string;
  image: string;
  banned: boolean;
}

interface IChangePasswordInfo {
  editing: boolean;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
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

  const [changePasswordInfo, setChangePasswordInfo] = useState<IChangePasswordInfo>({ editing: false, oldPassword: "", newPassword: "", newPasswordRepeat: "" });
  const changePassword = () => {
    new UserControllerApi().updateCredentials({
      id: props.id,
      userCredentialsUpdate: {
        password: changePasswordInfo.newPassword,
        currentPassword: changePasswordInfo.oldPassword
      }
    }, { credentials: "include" });
  };

  //const [profileImage, setProfileImage] = useState(null);
  const changeFile = async (event) => {
    //await setProfileImage(event.target.file[0]);
    let formData: FormData = new FormData();
    //formData.append("image", event.target.value);
    formData.append("image", "jfdsljadsfladsjlkfjdslf");
    fetch(`http://localhost:8080/api/user/upload-profile-picture/${props.id}`, {
      method: "POST",
      body: formData,
      credentials: "include"
    })
  };

  const deleteUser = async () => {
    await new UserControllerApi()._delete({ id: props.id }, { credentials: 'include' });
    window.location.replace("http://localhost:3000/");
  };

  const banUser = async () => {
    await new UserControllerApi().banUser({ id: props.id }, { credentials: 'include' });
    window.location.reload();
  };

  const unbanUser = async () => {
    await new UserControllerApi().unbanUser({ id: props.id }, { credentials: 'include' });
    window.location.reload();
  };

  const changeRole = async () => {
    await new UserControllerApi().updateRole({ id: props.id, userRoleUpdate: { role: selectedRole } }, { credentials: 'include' });
    window.location.reload();
  };

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
            {/* <Input accept="image/*" multiple type="file" />
            <Button variant="contained" component="span" color="secondary" sx={{ width: "45%" }}>
              Dodaj zdjęcie
            </Button> */}
            <label htmlFor="contained-button-file" style={{ width: "45%", marginRight: 5 }}>
              <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={changeFile}/>
              <Button variant="contained" component="span" color="secondary" sx={{ width: "100%" }}>
                Dodaj zdjęcie
              </Button>
            </label>
            <PasswordPopup id={props.id} />
          </div>
        }
        {
          isAdmin &&
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button
              onClick={() => deleteUser()}
              variant="contained"
              color="warning"
              sx={{
                borderColor: "secondary.main",
                width: "45%",
              }}
            >
              Usuń użytkownika
            </Button>
            <Button
              onClick={props.banned ? () => unbanUser() : () => banUser()}
              variant="contained"
              color="warning"
              sx={{
                borderColor: "secondary.main",
                width: "45%",
              }}
            >
              {props.banned ? "Odbanuj" : "Zbanuj"}
            </Button>
          </div>
        }
        {
          isAdmin &&
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Select
              value={selectedRole}
              onChange={(val) => setSelectedRole(val.target.value)}
              variant="outlined"
              color="secondary"
              sx={{
                color: "text.primary",
                borderColor: "secondary.main",
                width: "45%",
                height: "36.5px",
                textAlign: "center"
              }}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="EDITOR">EDITOR</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </Select>
            <Button
              onClick={() => changeRole()}
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
