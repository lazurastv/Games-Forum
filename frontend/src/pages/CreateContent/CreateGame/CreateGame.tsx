import { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadGame, uploadGame } from "../../../fetchData/fetchGames";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../utils/dataConversion";
import { GameAddUpdate } from "../../../api/api";
import OneLineInput from "../OneLineInput";
import MultipleSelect from "../MultipleSelect";
import CRRating from "../CreateReview/CRRating";
import DatePicker from "../DatePicker";
import { sliderConf } from "../../../components/Filters/Filter/Filter.conf";
import { gameDataToDB } from "../../../dictionary/mapData";
import { game } from "../../../dictionary/gameDataDictionary";
const checkboxGroup = [
  {
    name: "Gatunek",
    checkboxLabels: game.genre,
  },
  {
    name: "Platforma",
    checkboxLabels: game.platform,
  },
  {
    name: "Dystrybucja",
    checkboxLabels: game.dystribution,
  },
];
const today = new Date();
const date =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

export default function CreateGame() {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [score, setScore] = useState<number | null>(null);
  const [gamePublishDate, setGamePublishDate] = useState<string>(date);
  const [developer, setDeveloper] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([checkboxGroup[0].checkboxLabels[0]]);
  const [platforms, setPlatforms] = useState<string[]>([checkboxGroup[1].checkboxLabels[0]]);
  const [distributions, setDistributions] = useState<string[]>([checkboxGroup[2].checkboxLabels[0]]);

  const handleSave = async () => {
    const game: GameAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      gamePublishDate: new Date(gamePublishDate),
      developer: developer,
      editorScore: score ?? 0,
      genres: (gameDataToDB(genres) ?? [checkboxGroup[0].checkboxLabels[0]]) as Array<string>,
      platforms: (gameDataToDB(platforms) ?? [checkboxGroup[1].checkboxLabels[0]]) as Array<string>,
      distributions: (gameDataToDB(distributions) ?? [checkboxGroup[2].checkboxLabels[0]]) as Array<string>,
    };
    //
    // TODO obsługa błędów
    //
    console.log(game);
    uploadGame(game);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SectionHeader>Dodaj grę</SectionHeader>
      <Box
        component="form"
        onSubmit={(e: any) => {
          handleSave();
          e.preventDefault();
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3, mb: 4 }}>
          <Box>
            <OneLineInput label="Tytuł" value={title} onChange={(e: any) => setTitle(e.target.value)} />
            <OneLineInput
              label="Wprowadzenie"
              value={introduction}
              onChange={(e: any) => setIntroduction(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {checkboxGroup.map((val, idx) => (
              <MultipleSelect
                key={val.name}
                names={val.checkboxLabels}
                label={val.name}
                values={idx === 0 ? genres : idx === 1 ? platforms : distributions}
                setValues={idx === 0 ? setGenres : idx === 1 ? setPlatforms : setDistributions}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              columnGap:2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <OneLineInput label="Producent" value={developer} onChange={(e: any) => setDeveloper(e.target.value)} />
            </Box>
            <DatePicker
              sx={{
                flex: 1,
              }}
              label="Data premiery"
              color="secondary"
              type="date"
              value={gamePublishDate}
              onChange={(e) => setGamePublishDate(e.target.value)}
              inputProps={{ min: sliderConf.yearRange[0] + "-01-01", max: sliderConf.yearRange[1] + "-12-31" }}
            />
            <Box sx={{ flex: 1 }} />
          </Box>
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
