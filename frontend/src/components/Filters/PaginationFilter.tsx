import { Pagination, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PaginationFilter(props: any) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Pagination
      count={props.paginationConf.totalPages}
      page={props.page}
      color="secondary"
      size={matches ? "large" : "medium"}
      shape="rounded"
      variant="outlined"
      sx={{
        my: 3,
        ".MuiPagination-ul": {
          justifyContent: matches ? "end" : "center",
        },
      }}
      onChange={props.onPageChange}
    />
  );
}
