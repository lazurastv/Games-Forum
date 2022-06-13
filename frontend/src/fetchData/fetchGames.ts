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
  fetch(`https://forum-graczy-backend.herokuapp.com/api/game/upload-content-and-images/${id}`, {
    method: "POST",
    body: files,
    credentials: "include"
  });
  return id;
}
export { uploadGame, loadGame, loadAllGames, loadSimilarGames, deleteGame };
