import { PossibleData } from "./Filter.types";
// Filter methods return array of ids of elements to be filtered out

// Returns true if value from search box is in tag
const match = (tag: string, searchValue: string): boolean => {
  return tag.toUpperCase().includes(searchValue.toUpperCase());
};

function filterData<T extends PossibleData>(data: T, searchValue: string, year: number[], checkboxes?: any): number[] {
  // filter out values that are not included in any tag
  let dataToFilter = data.filter((d) => {
    return (
      d.title &&
      !match(d.title, searchValue) &&
      d.introduction &&
      !match(d.introduction, searchValue) &&
      d.authorName &&
      !match(d.authorName, searchValue)
    );
  });
  dataToFilter = data.filter((d) => {
    if (d.publishDate) {
      let date = d.publishDate && d.publishDate.getFullYear();
      return date >= year[0] && date <= year[1];
    } else {
      return true;
    }
  });
  return dataToFilter.map((d) => d.id as number);
}
// // filter Games
// function filterData<T extends PossibleData>(data: T, searchValue: string, checkboxes: any) {
//   let dataToFilter = data.filter((d) => {
//     return !d.title?.toUpperCase().includes(searchValue.toUpperCase());
//   });
//   return dataToFilter.map((d) => d.id);
// }

export { filterData };
