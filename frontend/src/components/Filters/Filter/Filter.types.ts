import React from "react";
import { ContentData } from "../../../pages/ApiData.types";
export interface FilterControl {
  setSortOrder: (order: number[]) => void;
  setLoading: (loading: boolean) => void;
  // indexes of data that are going to be filtered out
  setIdxToFilter: (idxToFilter: number[]) => void;
}
export interface FilterProps<T extends ContentData> extends FilterControl {
  data: T[];
  sliderLabel: string;
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
