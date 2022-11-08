import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import LoadingFailure from "../pages/Errors/LoadingFailure";
interface IFetchFun {
  [key: string]: Function;
}
function withLoading(WrappedComponent: any, fetchFun: IFetchFun, skipIfNoId?: boolean) {
  const WithLoading = (props: any) => {
    let { id } = useParams();
    const [reload, setReload] = useState<number>(0);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
      setIsLoading(true);
      setIsError(false);
      setData({});
      if (skipIfNoId && !id) {
        setIsLoading(false);
      } else {
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
              setIsError(true);
            });
        }
      }
    }, [id, reload]);
    return isError ? (
      <LoadingFailure />
    ) : isLoading ? (
      <LoadingSpinner />
    ) : (
      <WrappedComponent {...props} {...data} setReload={setReload} />
    );
  };
  return WithLoading;
}

export default withLoading;
