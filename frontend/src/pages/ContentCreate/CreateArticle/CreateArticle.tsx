import { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadArticle, uploadArticle } from "../../../fetchData/fetchArticles";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../components/Editor/dataConversion";
import { ArticleAddUpdate } from "../../../api/api";
import OneLineInput from "../components/OneLineInput";
import StyledEditorContent from "../../../components/Editor/StyledEditorContent";

// temp
import { convertToRaw } from "draft-js";

export default function CreateArticle() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const handleSave = async () => {
    const article: ArticleAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
    };
    //
    // TODO obsługa błędów
    //
    uploadArticle(article);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Dodaj artykuł</SectionHeader>
      <Box
        component="form"
        onSubmit={(e: any) => {
          handleSave();
          e.preventDefault();
        }}
      >
        <Box sx={{ mb: 4 }}>
          <OneLineInput label="Tytuł" value={title} onChange={(e: any) => setTitle(e.target.value)} />
          <OneLineInput
            label="Wprowadzenie"
            value={introduction}
            onChange={(e: any) => setIntroduction(e.target.value)}
          />
        </Box>
        <StyledEditorContent>
          <DraftEditor editorState={editorState} setEditorState={setEditorState} />
        </StyledEditorContent>
        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Button
            sx={{
              width: {
                sm: "100%",
                md: "150px",
              },
            }}
            onClick={() => {
              let list = convertToRaw(editorState.getCurrentContent()).entityMap;
              for (let key in list) {
                console.log(list[key].data.src);
                fetch(list[key].data.src).then(res => res.blob()).then(blob => {
                  let formData : FormData = new FormData();
                  formData.append("file", blob);
                  return formData
                }).then(image => {
                  fetch('http://localhost:8080/api/images/upload', {
                    method: "POST",
                    body: image,
                    credentials: "include"
                  }).then(res => console.log(res))
                  .catch(err => alert(err));
                });
              }
            }}
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
