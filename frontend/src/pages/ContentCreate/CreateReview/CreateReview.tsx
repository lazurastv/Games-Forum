import { Container, Box, Select, MenuItem, Button } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameSearchInfoVM, ReviewAdd } from "../../../api/api";
import { ReviewFullInfoPlusContent } from "../../../api/api/models/ReviewFullInfoPlusContent";
import { editorToString, stringToEditorState } from "../../../components/Editor/dataConversion";
import DraftEditor from "../../../components/Editor/DraftEditor";
import SectionHeader from "../../../components/SectionHeader";
import { loadAllGames } from "../../../fetchData/fetchGames";
import { updateReview, uploadReview, loadReview } from "../../../fetchData/fetchReviews";
import withLoading from "../../../fetchData/withLoading";
import { useAlert } from "../../../hooks/useAlert";
import Label from "../components/Label";
import OneLineInput from "../components/OneLineInput";
import CRRating from "./CRRating";
import PlusMinus from "./PlusMinus";

function CreateReview({ review }: { review?: ReviewFullInfoPlusContent }) {
  const [gameId, setGameId] = useState<number>(7);
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [pluses, setPluses] = useState<Array<string>>([""]);
  const [minuses, setMinuses] = useState<Array<string>>([""]);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const { displayAlert } = useAlert();
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [pictureName, setPictureName] = useState<string>("");
  const [games, setGames] = useState<GameSearchInfoVM[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  if (!loading) {
    setLoading(true);
    loadAllGames().then(x => setGames(x));
  }

  const handleSave = async () => {
    const addReview: ReviewAdd = {
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
    if (picture != null) {
      formData.append("mainPicture", picture);
    }
    for (let key in list) {
      await fetch(list[key].data.src)
        .then((res) => res.blob())
        .then((blob) => {
          formData.append("files", blob);
        });
    }
    if (review && review.id) {
      updateReview(review.id, addReview, formData)
        .then(() => navigate(`/recenzje/${review.id}`))
        .catch((err) => err.json())
        .then((x) => displayAlert(x.message, x.status));
    } else {
      uploadReview(addReview, formData)
        .then((id) => navigate(`/recenzje/${id}`))
        .catch((err) => err.json())
        .then((x) => displayAlert(x.message, x.status));
    }
  };
  useEffect(() => {
    if (review) {
      review.title && setTitle(review.title);
      review.introduction && setIntroduction(review.introduction);
      review.pluses && setPluses(review.pluses);
      review.minuses && setMinuses(review.minuses);
      review.score && setScore(parseInt(review.score.toFixed(0)));
      if (review.content && !JSON.parse(review.content).error) {
        setEditorState(stringToEditorState(review.content));
      }
    }
  }, [review]);

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
    setPictureName(event.target.files[0].name);
  }

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
          <Box sx={{ mb: 4, display: "flex", gap: "10px" }}>
            <Button variant="contained" component="label" color="secondary" >
              Dodaj obraz
              <input type="file" onChange={handlePictureChange} accept=".png,.jpeg,.jpg" hidden />
            </Button>
            <Label>{pictureName}</Label>
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
export default withLoading(
  CreateReview,
  {
    review: async (id) => {
      let rev = await loadReview(id);
      let content = await fetch(`http://localhost:8080/content/${rev.path}/content.json`)
        .then((res) => res.json())
        .then((data) => JSON.stringify(data));
      let articleWithContent: ReviewFullInfoPlusContent = rev;
      articleWithContent.content = content;
      return articleWithContent;
    },
  },
  true
);
