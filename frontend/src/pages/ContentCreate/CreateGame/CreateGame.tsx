import { useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import { loadGame, uploadGame } from "../../../fetchData/fetchGames";
import DraftEditor from "../../../components/Editor/DraftEditor";
import { editorToString } from "../../../components/Editor/dataConversion";
import { GameAddUpdate } from "../../../api/api";
import OneLineInput from "../components/OneLineInput";
import MultipleSelect from "../components/MultipleSelect";
import CRRating from "../CreateReview/CRRating";
import DatePicker from "../components/DatePicker";
import { sliderConf } from "../../../components/Filters/Filter/Filter.conf";
import { game } from "../../../data-mock/gameDataDictionary";
import SimplePopup from "../../../components/Popups/SimplePopup";
// temp
import { convertToRaw } from "draft-js";

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

export interface PopupsState {
  ok: boolean;
  error: boolean;
}

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
  const [isOpen, setIsOpen] = useState<PopupsState>({ ok: false, error: false });

  const handleSave = async () => {
    const game: GameAddUpdate = {
      title: title,
      introduction: introduction,
      content: editorToString(editorState),
      gamePublishDate: new Date(gamePublishDate),
      developer: developer,
      editorScore: score ?? 0,
      genres: (genres ?? [checkboxGroup[0].checkboxLabels[0]]) as Array<string>,
      platforms: (platforms ?? [checkboxGroup[1].checkboxLabels[0]]) as Array<string>,
      distributions: (distributions ?? [checkboxGroup[2].checkboxLabels[0]]) as Array<string>,
    };
    //
    // TODO obsługa błędów
    //

    let list = convertToRaw(editorState.getCurrentContent()).entityMap;
    let formData: FormData = new FormData();
    formData.append("content", editorToString(editorState));
    for (let key in list) {
      await fetch(list[key].data.src).then(res => res.blob()).then(blob => {
        formData.append("files", blob);
      });
    }

    uploadGame(game, formData).then(() => setIsOpen({ ...isOpen, ok: true })).catch(() => setIsOpen({ ...isOpen, error: true }));
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
              columnGap: 2,
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
      <SimplePopup open={isOpen.ok} title={"Zapisano"} content={"Gra została zapisana."} handleClose={function (): void {
        setIsOpen({ ...isOpen, ok: false });
      }} />
      <SimplePopup open={isOpen.error} title={"Błąd"} content={"Gra nie została zapisana."} handleClose={function (): void {
        setIsOpen({ ...isOpen, error: false });
      }} />
    </Container>
  );
}
