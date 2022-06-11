import { Avatar, Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";

interface IProfileBox {
  username: string;
  role: string;
  image: string;
}

export default function ProfileBox(props: IProfileBox) {
  const usernameFontSize = { xs: 24, sm: 32, md: 30 };
  const roleFontSize = { xs: 16, sm: 18, md: 18 };
  const imageSize = { xs: 150, sm: 250, md: 250 };
  const profileBoxWidth = { xs: "auto", sm: "auto", md: 500 };

  const [file, setFile] = useState(null);

  const handelFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append("")
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
      <Box display="flex" justifyContent="center" sx={{ flexDirection: "row", mt: 2, width: "100%" }}>
        <label htmlFor="contained-button-file" style={{ width: "45%", marginRight: 5 }}>
          <Input accept="image/*" id="contained-button-file" multiple type="file" />
          <Button variant="contained" component="span" color="secondary" sx={{ width: "100%" }}>
            Dodaj zdjęcie
          </Button>
        </label>
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
      </Box>
    </Box>
  );
}
const Input = styled("input")({
  display: "none",
});
