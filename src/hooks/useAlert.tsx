import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

interface IAlertContext {
  displayAlert: (text: string, error?: boolean) => void;
  alert: React.ReactNode;
}
const AlertContext = createContext<IAlertContext | undefined>(undefined);
const useAlert = () => {
  const alertContext = useContext(AlertContext);
  if (!alertContext) throw new Error("No AlertContext.Provider found when calling useAlert.");
  return alertContext;
};

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertText, setAlertText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const displayAlert = (title: string, error: boolean = false) => {
    setAlertText(title);
    setIsError(error);
    setOpen(true);
  };
  let alert = (
    <Snackbar open={open} autoHideDuration={6000} onClose={(e) => setOpen(false)}>
      {isError ? (
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: "100%" }}>
          {alertText}
        </Alert>
      ) : (
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
          {alertText}
        </Alert>
      )}
    </Snackbar>
  );
  return <AlertContext.Provider value={{ displayAlert, alert }}>{children}</AlertContext.Provider>;
};
export { useAlert, AlertProvider };
