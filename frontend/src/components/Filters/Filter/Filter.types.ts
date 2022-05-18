import React from "react";
import { ArticleSearchInfoVM, GameSearchInfoVM, ReviewSearchInfoVM } from "../../../api/api";

export type PossibleData = GameSearchInfoVM[] | ArticleSearchInfoVM[] | ReviewSearchInfoVM[];
export type FilterProps<T extends PossibleData> = {
  data: T;
  sliderLabel: string;
  setSortOrder: (order: number[]) => void;
  setLoading: (loading: boolean) => void;
  // indexes of data that are going to be filtered out
  setIdxToFilter: (idxToFilter: number[]) => void;
  children?: React.ReactNode;
  otherFilters?: any;
  clearOtherFilters?: any;
  page?: number;
};
export type FilterSliderProps = {
  // TODO get max and min year from data to filter for better UX
  yearRange?: number[];
  //
  year: number[];
  handleSliderChange: any;
  label: string;
};
