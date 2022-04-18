const game = {
  genre: ["Akcji", "RPG", "Strategiczne", "Sportowe", "FPS", "Przygodowe", "Survival", "Sandbox"],
  platform: ["PC", "XBOX 360", "PS4", "XBOX ONE", "Switch", "PS3"],
  dystribution: ["Steam", "Epic Games", "Origin", "Ubisoft"],
};
const gameDB = {
  genre: ["Action", "RPG", undefined, undefined, "FPS", "Adventure", "Survival", "Sandbox"],
  platform: ["PC", "Xbox 360", "PlayStation 4", "Xbox One", undefined, "PlayStation 3"],
  dystributionDB: ["Steam", "Epic Games", undefined, "Ubisoft"],
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
