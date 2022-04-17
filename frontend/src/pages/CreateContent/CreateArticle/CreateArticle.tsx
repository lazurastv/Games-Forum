import React, { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SectionHeader from "../../../components/SectionHeader";
import { loadArticle, uploadArticle, UploadArticle } from "./uploadArticle";
import DraftEditor from "../../../components/Editor/DraftEditor";

const Title = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.light,
    },
  },
}));
export default function CreateArticle() {
  const [title, setTitle] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const handleSave = async () => {
    const article: UploadArticle = {
      title: title,
      //
      // TODO introduction
      //
      introduction: "Hello",
      editorState: editorState,
    };
    //
    // TODO obsługa błędów
    //
    uploadArticle(article);

  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Napisz artykuł</SectionHeader>
      <Title
        label="Tytuł"
        color="secondary"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <DraftEditor editorState={editorState} setEditorState={setEditorState} />
      <Box sx={{ textAlign: "right" }}>
        <Button
          sx={{
            width: {
              sm: "100%",
              md: "150px",
            },
          }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleSave}
        >
          Zapisz
        </Button>
      </Box>
    </Container>
  );
}
