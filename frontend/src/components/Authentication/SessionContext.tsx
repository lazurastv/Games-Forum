import { createContext, useContext, useEffect, useState } from "react";
import { UserControllerApi, UserVM } from "../../api/api";
import { AuthApi } from "../../api/api/apis/AuthApi";
import Cookies from "js-cookie";
import { DATA_COOKIE, getSessionCookie, setSessionCookie } from "./cookieHandling";

export type Session = {
  user?: UserVM;
  isAuthenticated?: boolean;
  redirectPath: string;
};

const initialSession: Session = {
  redirectPath: "",
};
interface ISessionContext {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session;
}
const SessionContext = createContext<ISessionContext | undefined>(undefined);
const useSessionContext = () => {
  const gridItemContext = useContext(SessionContext);
  if (!gridItemContext)
    throw new Error("No SessionContext.Provider found when calling useSessionContext.");
  return gridItemContext;
};
const SessionContextProvider: React.FC = (props) => {
  const auth = new AuthApi();
  const user = new UserControllerApi();
  const [session, setSession] = useState(initialSession);
  useEffect(() => {
    let cookie = getSessionCookie(DATA_COOKIE);
    // mock authentication because i don't know how to chekc if user is logged in in database without logging in again
    // (sessionId cookie behaves weird)
    setSession((s) => {
      return {
        ...s,
        isAuthenticated: cookie ? true : false,
        //
        user: cookie,
      };
    });
  }, []);
  const login = (email: string, password: string): Promise<void> => {
    return auth
      .login()
      .then(() => user.getByEmail({ email: email }))
      .then((res) => {
        setSessionCookie(res);
        return res;
      })
      .then((res) => setSession({ ...session, isAuthenticated: true, user: res }));
  };
  const logout = () => {
    return auth
      .logout()
      .then(() => Cookies.remove(DATA_COOKIE))
      .then(() => setSession({ ...session, isAuthenticated: false, user: undefined }));
  };
  return (
    <SessionContext.Provider value={{ login, logout, session }}>
      {props.children}
    </SessionContext.Provider>
  );
};
export { SessionContext, useSessionContext, SessionContextProvider, initialSession };
