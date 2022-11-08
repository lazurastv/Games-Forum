import { Typography } from "@mui/material";
import { useState } from "react";
import { FilterControl } from "../components/Filters/Filter/Filter.types";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { ContentData } from "../pages/ApiData.types";
interface FilterData<T extends ContentData> {
  // Feedback ->  something to display if data is loading/undefined
  Feedback: React.ReactNode;
  data: (T | undefined)[];
  // filterControl -> props to pass down to Filter component
  filterControl: FilterControl;
}
export default function useFilterData<T extends ContentData>(data: T[], userName?: string): FilterData<T> {
  const [idxToFilter, setIdxToFilter] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let Feedback: React.ReactNode;
  let dataToDisplay = userName
    ? sortOrder
        .map((id) => data.find((d) => d.id === id))
        .filter((d) => d && d.id && !idxToFilter.includes(d.id) && d.authorName === userName)
    : sortOrder.map((id) => data.find((d) => d.id === id)).filter((d) => d && d.id && !idxToFilter.includes(d.id));
  if (loading) {
    Feedback = <LoadingSpinner />;
  } else if (!dataToDisplay?.length) {
    Feedback = (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          minHeight: "200px",
        }}
      >
        {"Nie znaleziono żadnych elementów odpowiadających ustawieniom filtrowania :("}
      </Typography>
    );
  }
  return {
    Feedback: Feedback,
    filterControl: {
      setIdxToFilter: setIdxToFilter,
      setSortOrder: setSortOrder,
      setLoading: setLoading,
    },
    data: dataToDisplay,
  };
}
