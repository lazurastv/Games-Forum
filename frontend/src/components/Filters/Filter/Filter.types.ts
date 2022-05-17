import React from "react";
import { ArticleSearchInfoVM, GameSearchInfoVM, ReviewSearchInfoVM } from "../../../api/api";

export type PossibleData = GameSearchInfoVM[] | ArticleSearchInfoVM[] | ReviewSearchInfoVM[];
export type FilterProps<T extends PossibleData> = {
  data: T;
  // indexes of data that are going to be filtered out
  setIdxToFilter?: (idxToFilter: number[]) => void;
  children?: React.ReactNode;
  otherFilters?: any;
  clearOtherFilters?: any;
  page?: number;
};
