import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../pages/Error/Error";
interface IFetchFun {
  [key: string]: Function;
}
function withLoading(WrappedComponent: any, fetchFun: IFetchFun) {
  const WithLoading = (props: any) => {
    let { id } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
      setIsLoading(true);
      setIsError(false);
      setData({});
      for (const [key, value] of Object.entries(fetchFun)) {
        value(id)
          .then((res: any) => {
            setData((d) => {
              return { ...d, [key]: res };
            });
            setIsLoading(false);
          })
          .catch((err: any) => {
            console.error(err);
            setIsLoading(false);
            setIsError(true);
          });
      }
    }, [id]);
    return isError ? (
      <Error />
    ) : isLoading ? (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}
      >
        <CircularProgress color="secondary" />
      </Box>
    ) : (
      <WrappedComponent {...props} {...data} />
    );
  };
  return WithLoading;
}

export default withLoading;
