import React, { useEffect, useState } from "react";

function withLoading(WrappedComponent: any, fetchFun: any) {
  const WithLoading = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
      setIsLoading(true);
      setIsError(false);
      fetchFun()
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
    return isLoading ? <div>Loading...</div> : <WrappedComponent data={data} />;
  };
  return WithLoading;
}

export default withLoading;
