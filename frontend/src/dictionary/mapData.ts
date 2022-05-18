import { gameDataMapFromDB, gameDataMapToDB } from "./gameDataDictionary";
const isString = (item: string | undefined): item is string => {
  return !!item;
};
function gameDataFromDB(s: string | Array<string>): string | undefined | Array<string> {
  if (Array.isArray(s)) {
    // If element doesn't exist in dictionary it's removed from array
    return s.map((el) => gameDataMapFromDB.get(el)).filter(isString);
  }
  return gameDataMapFromDB.get(s);
}
function gameDataToDB(s: string | Array<string>): string | undefined | Array<string> {
  if (Array.isArray(s)) {
    // If element doesn't exist in dictionary it's removed from array
    return s.map((el) => gameDataMapToDB.get(el)).filter(isString);
  }
  return gameDataMapToDB.get(s);
}
export { gameDataFromDB, gameDataToDB };
