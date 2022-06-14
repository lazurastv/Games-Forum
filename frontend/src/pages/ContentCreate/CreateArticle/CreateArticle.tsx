import { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, Input } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadArticle, uploadArticle } from "../../../fetchData/fetchArticles";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../components/Editor/dataConversion";
import { ArticleAddUpdate } from "../../../api/api";
import OneLineInput from "../components/OneLineInput";
import StyledEditorContent from "../../../components/Editor/StyledEditorContent";
import { convertToRaw } from "draft-js";
import { useAlert } from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import Label from "../components/Label";

export default function CreateArticle() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [picture, setPicture] = useState(null);
  const [pictureName, setPictureName] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const { displayAlert } = useAlert();
  const navigate = useNavigate();
  const handleSave = async () => {
    const article: ArticleAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
    };

    let list = convertToRaw(editorState.getCurrentContent()).entityMap;
    let formData: FormData = new FormData();
    formData.append("content", editorToString(editorState));
    if (picture != null) {
      formData.append("mainPicture", picture);
    }
    for (let key in list) {
      await fetch(list[key].data.src).then(res => res.blob()).then(blob => {
        formData.append("files", blob);
      });
    }

    uploadArticle(article, formData)
      .then(id => navigate(`/artykuly/${id}`))
      .catch(err => err.json())
      .then(x => displayAlert(x.message, x.status));
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
    setPictureName(event.target.files[0].name);
  }


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
        <Box sx={{ mb: 4, display: "flex", gap: "10px" }}>
          <Button variant="contained" component="label" color="secondary" >
            Dodaj obraz
            <input type="file" onChange={handlePictureChange} accept=".png,.jpeg,.jpg" hidden />
          </Button>
          <Label>{pictureName}</Label>
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
