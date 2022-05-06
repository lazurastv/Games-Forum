import { AuthApi } from "../api/api/apis/AuthApi";
import { GameAddUpdate, GameControllerApi, GameFullInfoVM } from "../api/api";

async function loadGame(id: number): Promise<GameFullInfoVM> {
  const auth = new AuthApi();
  const games = new GameControllerApi();
  return auth.login().then((result) => games.getGameFullInfo({ gameId: id }));
  // .catch((error) => console.error("Read" + error))
  // .catch((error) => console.error("Login " + error));
}
async function uploadGame(game: GameAddUpdate) {
  const auth = new AuthApi();
  const games = new GameControllerApi();
  return auth
    .login()
    .catch((error) => console.error("Login " + error))
    .then((result) => games.addGame({ gameAddUpdate: game }, { credentials: "include" }))
    .catch((error) => console.error("Add " + error))
    .then((result) => games.getAllGames())
    .then((result) => {
      result.forEach((x) => console.log(x));
    })
    .catch((error) => console.error("Read" + error));
}
export { uploadGame, loadGame };
