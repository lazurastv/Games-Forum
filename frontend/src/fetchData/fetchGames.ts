import {
  GameAddUpdate,
  GameControllerApi,
  GameFullInfoVM,
  GameSearchInfoVM,
  GameVM,
} from "../api/api";
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
async function uploadGame(game: GameAddUpdate) {
  const games = new GameControllerApi();
  return games
    .addGame({ gameAddUpdate: game }, { credentials: "include" })
    .then(() => games.getAllGames())
    .then((result) => {
      result.forEach((x) => console.log(x));
    });
}
export { uploadGame, loadGame, loadAllGames, loadSimilarGames };
