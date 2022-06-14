import { GameAddUpdate, GameControllerApi, GameFullInfoVM, GameSearchInfoVM, GameVM } from "../api/api";
async function loadSimilarGames(id: number): Promise<GameVM[]> {
  const games = new GameControllerApi();
  return games.getSimilarGames({ gameId: id });
}
async function loadAllGames(): Promise<GameSearchInfoVM[]> {
  const games = new GameControllerApi();
  return games.getAllGameSearchInfos();
}
async function loadGame(id: number): Promise<GameFullInfoVM> {
  const games = new GameControllerApi();
  return games.getGameFullInfo({ gameId: id });
}
async function deleteGame(id: number): Promise<void> {
  const games = new GameControllerApi();
  return games.deleteGame({ gameId: id }, { credentials: "include" });
}
async function uploadGame(game: GameAddUpdate, files: FormData) {
  const games = new GameControllerApi();
  const id: number = await games.addGame({ gameAddUpdate: game }, { credentials: "include" });
  await fetch(`http://localhost:8080/api/game/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include"
  });
  return id;
}
async function updateGame(id: number, game: GameAddUpdate, files: FormData) {
  const games = new GameControllerApi();
  await fetch(`http://localhost:8080/api/game/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include"
  });
  return games.updateGame(
    {
      gameId: id,
      gameAddUpdate: game,
    },
    { credentials: "include" }
  );
}
export { uploadGame, loadGame, loadAllGames, loadSimilarGames, deleteGame, updateGame };
