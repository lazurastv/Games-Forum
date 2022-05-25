import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
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

export default function ProfileDataBox(props: IProfileDataBox) {
  const [descValue, setDescValue] = useState(props.description);
  const [editingDesc, setEditingDesc] = useState<IChangeDesc>({ editing: false, text: "Zmień opis" });

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
        <ProfileData label="Opis:">{descValue ?? props.description}</ProfileData>
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
}

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
