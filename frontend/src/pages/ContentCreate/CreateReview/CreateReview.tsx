import { Button, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { EditorState } from "draft-js";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { GameSearchInfoVM, ReviewAdd } from "../../../api/api";
import { editorToString } from "../../../components/Editor/dataConversion";
import DraftEditor from "../../../components/Editor/DraftEditor";
import SectionHeader from "../../../components/SectionHeader";
import { uploadReview } from "../../../fetchData/fetchReviews";
import OneLineInput from "../components/OneLineInput";
import MultipleSelect from "../components/MultipleSelect";
import CRRating from "./CRRating";
import PlusMinus from "./PlusMinus";

// temp
import { convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";
import { loadAllGames } from "../../../fetchData/fetchGames";
import withLoading from "../../../fetchData/withLoading";
import { useAlert } from "../../../hooks/useAlert";

function CreateReview({ games }: { games: GameSearchInfoVM[] }) {
  const [gameId, setGameId] = useState<number>(7);
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [pluses, setPluses] = useState<Array<string>>([""]);
  const [minuses, setMinuses] = useState<Array<string>>([""]);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const { displayAlert } = useAlert();
  const navigate = useNavigate();
  const handleSave = async () => {
    const review: ReviewAdd = {
      gameId: gameId,
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      score: score === null ? 0 : score,
      pluses: pluses,
      minuses: minuses,
    };

    let list = convertToRaw(editorState.getCurrentContent()).entityMap;
    let formData: FormData = new FormData();
    formData.append("content", editorToString(editorState));
    for (let key in list) {
      await fetch(list[key].data.src).then(res => res.blob()).then(blob => {
        formData.append("files", blob);
      });
    }

    uploadReview(review, formData)
      .then(id => navigate(`/recenzje/${id}`))
      .catch(err => err.json())
      .then(x => displayAlert(x.message, x.status));
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
            <Select
              value={gameId}
              onChange={(val) => setGameId(val.target.value as number)}
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "secondary.dark",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main",
                  },
                }
              }}
            >
              {
                games.map(x => <MenuItem key={x.id} value={x.id}>{x.title}</MenuItem>)
              }
            </Select>
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
export default withLoading(CreateReview, { games: loadAllGames })