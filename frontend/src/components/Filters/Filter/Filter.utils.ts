import { ContentData } from "../../../pages/ApiData.types";
import { CheckboxFilters } from "../GamesFilter/GamesFilter";
import { ASCENDING, POPULARITY, PUBLISH_DATE, sortValues } from "./Filter.conf";
// Filter methods return array of ids of elements to be filtered out

// Returns true if value from search box is in tag
const match = (tag: string, searchValue: string): boolean => {
  return tag.toUpperCase().includes(searchValue.toUpperCase());
};

function filterData<T extends ContentData>(
  data: T[],
  searchValue: string,
  year: number[],
  checkboxGroups?: CheckboxFilters
): number[] {
  let dataToKeep = data;
  // filter out values that are not included in any tag
  if (checkboxGroups) {
    // remove group from filtering if all checkboxes are unchecked
    let activeCheckboxGroups: { [key: string]: object } = Object.entries(checkboxGroups).reduce(
      (a, [key, value]) =>
        Object.values(value).every((v) => !v)
          ? a
          : {
            ...a,
            [key]: value,
          },
      {}
    );
    if (Object.entries(activeCheckboxGroups).length !== 0) {
      for (const [property, checkboxGroup] of Object.entries(activeCheckboxGroups)) {
        let propertyValues = Object.entries(checkboxGroup)
          .filter(([key, value]) => key && value)
          .map((v) => v[0]);
        console.log(propertyValues);
        dataToKeep = dataToKeep.filter(
          (d) => Array.isArray(d[property]) && propertyValues.some((el) => d[property].includes(el))
        );
      }
    }
  }
  dataToKeep = dataToKeep.filter(
    (d) =>
      (d.title && match(d.title, searchValue)) ||
      (d.introduction && match(d.introduction, searchValue)) ||
      (d.authorName && match(d.authorName, searchValue)) ||
      ((d as any).username) && match((d as any).username, searchValue)
  );
  console.log(dataToKeep);
  dataToKeep = dataToKeep.filter((d) => {
    if (d.publishDate) {
      let date = d.publishDate.getFullYear();
      return date >= year[0] && date <= year[1];
    } else {
      return true;
    }
  });
  console.log(dataToKeep);
  return data.filter((d) => !dataToKeep.includes(d)).map((d) => d.id as number);
}
function sortData<T extends ContentData>(data: T[], sortValue: string): number[] {
  let [property, order] = sortValue.split("-");
  let ascending = order === ASCENDING ? true : false;
  var newSortOrder: number[];
  if (property === PUBLISH_DATE) {
    newSortOrder = data
      .sort((a, b) => {
        if (!a.publishDate?.getFullYear()) {
          return -1;
        }
        if (!b.publishDate?.getFullYear()) {
          return 1;
        }
        if (a.publishDate.getFullYear() > b.publishDate.getFullYear()) {
          return ascending ? 1 : -1;
        } else {
          return ascending ? -1 : 1;
        }
      })
      .map((d) => d.id as number);
  } else {
    newSortOrder = data
      .sort((a, b) => {
        if (a.popularity === undefined) {
          return -1;
        }
        if (b.popularity === undefined) {
          return 1;
        }
        if (a.popularity > b.popularity) {
          return ascending ? 1 : -1;
        } else {
          return ascending ? -1 : 1;
        }
      })
      .map((d) => d.id as number);
  }
  // let ascending = sortValues.publishDateAscending.value === sortValue ? true : false;
  return newSortOrder;
}
export { filterData, sortData };
