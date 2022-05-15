import { createContext, useContext, useState } from "react";
import { UserVM } from "../../api/api";

export type Session = {
  user?: UserVM;
  isAuthenticated?: boolean;
  redirectPath: string;
};

const initialSession: Session = {
  redirectPath: "",
};

const SessionContext = createContext<[Session, (session: Session) => void]>([
  initialSession,
  () => {},
]);
const useSessionContext = () => useContext(SessionContext);

const SessionContextProvider: React.FC = (props) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [sessionState, setSessionState];

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
};
export { SessionContext, useSessionContext, SessionContextProvider, initialSession };
