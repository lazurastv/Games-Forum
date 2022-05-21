import React, { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadReview, uploadReview } from "../../../fetchData/fetchReviews";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../components/Editor/dataConversion";
import CRRating from "./CRRating";
import PlusMinus from "./PlusMinus";
import OneLineInput from "../components/OneLineInput";
import { ReviewAdd } from "../../../api/api";

export default function CreateReview() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [pluses, setPluses] = useState<Array<string>>([""]);
  const [minuses, setMinuses] = useState<Array<string>>([""]);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const handleSave = async () => {
    //
    // TODO obsługa błędów
    // //
    const review: ReviewAdd = {
      gameId: 7,
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      score: score === null ? 0 : score,
      pluses: pluses,
      minuses: minuses,
    };
    uploadReview(review);
    // .catch(
    //   (e) => console.error(e)
    // );
    // const rev:any = await loadReview(12);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Dodaj recenzję</SectionHeader>
      <Box
        component="form"
        onSubmit={(e: any) => {
          handleSave();
          e.preventDefault();
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1.5, mb: 4 }}>
          <Box>
            <OneLineInput label="Tytuł" value={title} onChange={(e: any) => setTitle(e.target.value)} />
            <OneLineInput
              label="Wprowadzenie"
              value={introduction}
              onChange={(e: any) => setIntroduction(e.target.value)}
            />
          </Box>
          <PlusMinus pluses={pluses} setPluses={setPluses} minuses={minuses} setMinuses={setMinuses} />
        </Box>
        <DraftEditor editorState={editorState} setEditorState={setEditorState} />
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
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
