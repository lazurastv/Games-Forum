import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function withLoading(WrappedComponent: any, fetchFun: any) {
  const WithLoading = (props: any) => {
    let { id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
      setIsLoading(true);
      setIsError(false);
      fetchFun(id)
        .then((res: any) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.error(err);
          setIsLoading(false);
          setIsError(err);
        });
    }, []);
    return isLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress color="secondary" />
      </Box>
    ) : (
      <WrappedComponent {...props} data={data} />
    );
  };
  return WithLoading;
}

export default withLoading;
