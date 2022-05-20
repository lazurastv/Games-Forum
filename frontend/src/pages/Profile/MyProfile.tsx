import { Avatar, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useSessionContext } from "../../components/Authentication/SessionContext";
const NGINX_URL = process.env.REACT_APP_NGINX_USER;

const MyProfile = () => {
  const {
    session: { user },
  } = useSessionContext();
  console.log(user);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md="auto">
          <ProfileBox
            username={user?.username ?? "unknown"}
            role={user?.role ?? "unknown"}
            image={`${NGINX_URL}/${user?.profilePicturePath}/profile.png`}
          />
        </Grid>
        <Grid item xs={12} sm={12} md sx={{ minWidth: 0 }}>
          <ProfileDataBox
            username={user?.username ?? "unknown"}
            email={user?.email ?? "unknown"}
            numberOfComments={user?.commentCount ?? 0}
            description={user?.shortDescription as string}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const Input = styled("input")({
  display: "none",
});

interface IProfileBox {
  username: string;
  role: string;
  image: string;
}

const ProfileBox = (props: IProfileBox) => {
  const usernameFontSize = { xs: 24, sm: 32, md: 30 };
  const roleFontSize = { xs: 16, sm: 18, md: 18 };
  const imageSize = { xs: 150, sm: 250, md: 250 };
  const profileBoxWidth = { xs: "auto", sm: "auto", md: 500 };
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
        // component="img"
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
};

interface IProfileDataBox {
  username: string;
  email: string;
  numberOfComments: number;
  description: string;
}

interface IChangeDesc {
  editing: boolean;
  text: string;
}

const dataFontSize = { xs: 16, sm: 18, md: 20 };
const labelFontSize = { xs: 14, sm: 16, md: 18 };

const ProfileDataBox = (props: IProfileDataBox) => {
  const [descValue, setDescValue] = React.useState(props.description);
  const [editingDesc, setEditingDesc] = React.useState<IChangeDesc>({ editing: false, text: "Zmień opis" });

  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescValue(event.target.value);
  };

  const handleChangeDescButton = () => {
    let txt = editingDesc.text === "Zmień opis" ? "Zapisz zmiany" : "Zmień opis";
    setEditingDesc({ editing: !editingDesc.editing, text: txt });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        wordWrap: "break-word",
        backgroundColor: "primary.main",
        color: "text.primary",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 2,
        height: "auto",
        p: 3,
      }}
    >
      <ProfileData label="Nazwa użytkownika:">{props.username}</ProfileData>
      <ProfileData label="Email:">{props.email}</ProfileData>
      <ProfileData label="Liczba komentarzy:">{props.numberOfComments}</ProfileData>
      {editingDesc.editing === false ? (
        <ProfileData label="Opis:">{props.description + (descValue ?? "")}</ProfileData>
      ) : (
        <TextField
          id="outlined-multiline-static"
          label="Edycja opisu"
          multiline
          rows={5}
          color="secondary"
          value={descValue}
          onChange={handleChangeDesc}
          autoFocus={true}
          helperText="Wprowadź opis swojego profilu, maksymalna długość XXX znaków."
        />
      )}
      <Stack direction="row" justifyContent="end">
        <Button
          disableElevation
          variant="outlined"
          color="secondary"
          onClick={handleChangeDescButton}
          sx={{
            color: "text.primary",
            borderColor: "secondary.main",
            width: 200,
            mt: 1,
          }}
        >
          {editingDesc.text}
        </Button>
      </Stack>
    </Box>
  );
};

const ProfileData = (props: any) => (
  <>
    <Typography
      sx={{
        display: "flex",
        textAlign: "left",
      }}
    >
      <Label>{props.label}</Label>
    </Typography>
    <Box sx={{ fontSize: { ...dataFontSize }, mb: 2 }}>
      <MultilineTruncatedText text={props.children} maxLine={"10"} />
    </Box>
  </>
);

const Label = (props: any) => (
  <Typography
    component="span"
    sx={{
      color: "text.secondary",
      fontWeight: "300",
      minWidth: "195px",
      fontSize: { ...labelFontSize },
      ...props.sx,
    }}
  >
    {props.children}
  </Typography>
);

export default MyProfile;
