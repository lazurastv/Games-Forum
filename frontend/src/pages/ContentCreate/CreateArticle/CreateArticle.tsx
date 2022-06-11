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
import SimplePopup from "../../../components/Popups/SimplePopup";

// temp
import { convertToRaw } from "draft-js";

export interface PopupsState {
  ok: boolean;
  error: boolean;
}

export default function CreateArticle() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [isOpen, setIsOpen] = useState<PopupsState>({ ok: false, error: false });
  const handleSave = async () => {
    const article: ArticleAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
    };

    let list = convertToRaw(editorState.getCurrentContent()).entityMap;
    let formData: FormData = new FormData();
    formData.append("content", editorToString(editorState));
    for (let key in list) {
      await fetch(list[key].data.src).then(res => res.blob()).then(blob => {
        formData.append("files", blob);
      });
    }

    await uploadArticle(article, formData).then(() => setIsOpen({ ...isOpen, ok: true }))
      .catch(err => console.log(err)).catch(() => setIsOpen({ ...isOpen, error: true }));
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
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Zapisz
          </Button>
        </Box>
      </Box>
      <SimplePopup open={isOpen.ok} title={"Zapisano"} content={"Artykuł zoztał zapisany."} handleClose={function (): void {
        setIsOpen({...isOpen, ok: false});
      } } />
      <SimplePopup open={isOpen.error} title={"Błąd"} content={"Artykuł nie został zapisany."} handleClose={function (): void {
        setIsOpen({...isOpen, error: false});
      } } />
    </Container>
  );
}
