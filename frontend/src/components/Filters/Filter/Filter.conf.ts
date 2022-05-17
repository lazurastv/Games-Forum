const sliderConf = { yearRange: [1990, 2022] };
export const POPULARITY = "popularity";
export const PUBLISH_DATE = "publishDate";
export const ASCENDING = "ascending";
export const DESCENDING = "descending";

const sortValues = {
  popularityDescending: {
    value: POPULARITY + "-" + DESCENDING,
    text: "popularność: największa",
  },
  popularityAscending: {
    value: POPULARITY + "-" + ASCENDING,
    text: "popularność: najmniejsza",
  },
  publishDateDescending: {
    value: PUBLISH_DATE + "-" + DESCENDING,
    text: "data publikacji: najnowsze",
  },
  publishDateAscending: {
    value: PUBLISH_DATE + "-" + ASCENDING,
    text: "data publikacji: najstarsze",
  },
};

export { sliderConf, sortValues };
