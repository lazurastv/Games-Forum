import { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import { Box, Button, TextField, Typography } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadGame, uploadGame } from "./fetchGames";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../components/Editor/dataConversion";
import { GameAddUpdate } from "../../../api/api";
import OneLineInput from "../OneLineInput";
import { styled } from "@mui/system";

const today = new Date();
const date =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

const DatePicker = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    // "& fieldset": {
    //   borderColor: "primary.light",
    // },
    "& input::-webkit-calendar-picker-indicator": {
      // color: theme.palette.secondary.main,
      filter:
        "invert(60%) sepia(33%) saturate(5275%) hue-rotate(12deg) brightness(94%) contrast(83%)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

export default function CreateGame() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [gamePublishDate, setGamePublishDate] = useState<string>(date);
  const handleSave = async () => {
    const game: GameAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      gamePublishDate: new Date(gamePublishDate),
      developer: "Chief",
      editorScore: 6,
      genres: ["RPG"],
      platforms: ["PC"],
      distributions: ["Steam"],
    };
    //
    // TODO obsługa błędów
    //
    console.log(game);
    // uploadGame(game);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Dodaj grę</SectionHeader>
      <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
        <Box sx={{ mb: 4 }}>
          <OneLineInput
            formLabel="Tytuł"
            placeholder="Napisz tytuł..."
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <OneLineInput
            formLabel="Wprowadzenie"
            placeholder="Napisz wprowadzenie..."
            value={introduction}
            onChange={(e: any) => setIntroduction(e.target.value)}
          />
          <Typography
            sx={{
              fontSize: "20px",
              color: "text.secondary",
              textAlign: "left",
              mb: 0.5,
            }}
          >
            Data premiery
          </Typography>
          <DatePicker
            color="secondary"
            type="date"
            value={gamePublishDate}
            onChange={(e) => setGamePublishDate(e.target.value)}
            inputProps={{ min: "1970-01-01", max: "2040-12-31" }}
          />
        </Box>

        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button
            sx={{
              width: {
                sm: "100%",
                md: "150px",
              },
            }}
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSave}
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
