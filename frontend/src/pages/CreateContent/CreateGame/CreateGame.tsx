import { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadGame, uploadGame } from "./fetchGames";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../components/Editor/dataConversion";
import { GameAddUpdate } from "../../../api/api";
import OneLineInput from "../OneLineInput";

export default function CreateGame() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const handleSave = async () => {
    const game: GameAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      gamePublishDate: new Date(2000, 10, 1),
      developer: "Chief",
      editorScore: 6,
      genres: ["RPG"],
      platforms: ["PC"],
      distributions: ["Steam"],
    };
    //
    // TODO obsługa błędów
    //
    uploadGame(game);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Napisz artykuł</SectionHeader>
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
