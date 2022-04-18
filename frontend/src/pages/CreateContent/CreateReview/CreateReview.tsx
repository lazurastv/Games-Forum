import React, { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadReview, uploadReview } from "./fetchReviews";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { ReviewAddUpdate } from "../../../api/api";
import { editorToString } from "../../../components/Editor/dataConversion";
import CRRating from "./CRRating";
import CRPlusMinus from "./CRPlusMinus";
import OneLineInput from "../OneLineInput";

export default function CreateReview() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [pluses, setPluses] = useState<Array<string>>([""]);
  const [minuses, setMinuses] = useState<Array<string>>([""]);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const handleSave = async () => {
    //
    // TODO obsługa błędów
    // //
    const review: ReviewAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      score: score === null ? 0 : score,
      pluses: pluses,
      minuses: minuses,
    };
    uploadReview(review)
    // .catch(
    //   (e) => console.error(e) 
    // );
    // const rev:any = await loadReview(12);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Dodaj recenzję</SectionHeader>
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
          <CRPlusMinus
            pluses={pluses}
            setPluses={setPluses}
            minuses={minuses}
            setMinuses={setMinuses}
          />
        </Box>
        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <CRRating
          sx={{
            mt: 3,
            mb: 4,
            textAlign: "center",
          }}
          rating={score}
          setRating={setScore}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            sx={{
              width: {
                xs: "100%",
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
      </Box>
    </Container>
  );
}
