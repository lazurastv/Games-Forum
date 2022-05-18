const game = {
  genre: ["Akcji", "RPG", "Strategie", "Survival", "Sandbox", "FPS", "Przygodowe"],
  platform: ["PC", "Xbox 360", "PlayStation 4", "Xbox One", "PlayStation 3", "Switch"],
  dystribution: ["Steam", "Epic Games", "Ubisoft", "Origin"],
};
const gameDB = {
  genre: ["Akcji", "RPG", "Strategie", "Survival", "Sandbox", "FPS", "Przygodowe"],
  platform: ["PC", "Xbox 360", "PlayStation 4", "Xbox One", "PlayStation 3", "Switch"],
  dystributionDB: ["Steam", "Epic Games", "Ubisoft", "Origin"],
};
const genreMapToDB = new Map(game.genre.map((g, idx) => [g, gameDB.genre[idx]]));
const platfromMapToDB = new Map(game.platform.map((g, idx) => [g, gameDB.platform[idx]]));
const dystributionMapToDB = new Map(game.dystribution.map((g, idx) => [g, gameDB.dystributionDB[idx]]));

const genreMapFromDB = new Map(game.genre.map((g, idx) => [gameDB.genre[idx], g]));
const platformMapFromDB = new Map(game.platform.map((g, idx) => [gameDB.platform[idx], g]));
const dystributionMapFromDB = new Map(game.dystribution.map((g, idx) => [gameDB.dystributionDB[idx], g]));

const gameDataMapFromDB = new Map([
  ...Array.from(genreMapFromDB.entries()),
  ...Array.from(platformMapFromDB.entries()),
  ...Array.from(dystributionMapFromDB.entries()),
]);
const gameDataMapToDB = new Map([
  ...Array.from(genreMapToDB.entries()),
  ...Array.from(platfromMapToDB.entries()),
  ...Array.from(dystributionMapToDB.entries()),
]);
export { game, gameDB, gameDataMapFromDB, gameDataMapToDB };
