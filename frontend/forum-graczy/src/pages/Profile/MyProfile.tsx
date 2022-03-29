import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
import { styled } from "@mui/material/styles";

const MyProfile = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md="auto">
          <ProfileBox
            username="NameSurname1234!"
            role="Użytkownik"
            image="https://www.pngkey.com/png/detail/14-148130_minion-imagenes-de-100x100-pixeles.png"
          />
        </Grid>
        <Grid item xs={12} sm={12} md sx={{minWidth: 0}}>
          <ProfileDataBox
            username="NameSurname1234!"
            email="emaillll@malpa.com"
            number_of_comments={33}
            description="opis lorem ipsum opis lorem ipsum opis lorem ipsum opis lorem ipsum opis lorem ipsum opis lorem ipsum opis lorem ipsum dluwwwwwwwgiwwwwwwwwwwwwwwweslowoslugieslowowwwwwwwwwwwowoowowwo opis lorem ipsum opis lorem ipsum"
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

const ProfileBox = (props:IProfileBox) => {
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
      <Box
        component="img"
        src={props.image}
        sx={{
          borderRadius: "50%",
          objectFit: "cover",
          width: { ...imageSize },
        }}
      ></Box>
      <Box sx={{ mt: 2, fontSize: { ...usernameFontSize } }}>
        {props.username}
      </Box>
      <Box color="text.secondary" sx={{ mt: 1, fontSize: { ...roleFontSize } }}>
        {props.role}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ flexDirection: "row", mt: 2, width: "100%" }}
      >
        <label htmlFor="contained-button-file" style={{width: "45%", marginRight: 5 }}>
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button
            variant="contained"
            component="span"
            color="secondary"
            sx={{ width: "100%" }}
          >
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
  number_of_comments: number;
  description: string;
}

const ProfileDataBox = (props:IProfileDataBox) => {

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
      <ProfileData label="Liczba komentarzy:">
        {props.number_of_comments}
      </ProfileData>
      <ProfileData label="Opis:">{props.description}</ProfileData>
      <Stack direction="row" justifyContent="end">
        <Button
          disableElevation
          variant="outlined"
          color="secondary"
          sx={{
            color: "text.primary",
            borderColor: "secondary.main",
            width: 200,
          }}
        >
          Zmień opis
        </Button>
      </Stack>
    </Box>
  );
};

const dataFontSize = { xs: 16, sm: 18, md: 20 };
const labelFontSize = { xs: 14, sm: 16, md: 18 };

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
    <Box sx={{ fontSize: { ...dataFontSize }, mb: 2}}>
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
      fontSize: {...labelFontSize},
      ...props.sx,
    }}
  >
    {props.children}
  </Typography>
);


export default MyProfile;
