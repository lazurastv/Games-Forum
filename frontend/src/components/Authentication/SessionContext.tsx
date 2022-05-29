import { createContext, useContext, useEffect, useState } from "react";
import { UserControllerApi, UserVM } from "../../api/api";
import { AuthApi } from "../../api/api/apis/AuthApi";

export type Session = {
  user?: UserVM;
  isAuthenticated: boolean;
  redirectPath: string;
  loading: boolean;
};

const initialSession: Session = {
  loading: true,
  isAuthenticated: true,
  redirectPath: "",
};
interface ISessionContext {
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session;
}
const SessionContext = createContext<ISessionContext | undefined>(undefined);
const useSessionContext = () => {
  const gridItemContext = useContext(SessionContext);
  if (!gridItemContext) throw new Error("No SessionContext.Provider found when calling useSessionContext.");
  return gridItemContext;
};
const SessionContextProvider: React.FC = (props) => {
  const auth = new AuthApi();
  const user = new UserControllerApi();
  const [session, setSession] = useState(initialSession);
  useEffect(() => {
    const u = new UserControllerApi();
    u.getSessionUser({ credentials: "include" })
      .then((res) => {
        setSession((s) => {
          return {
            ...s,
            isAuthenticated: res ? true : false,
            user: res,
            loading: false,
          };
        });
      })
      .catch((res) => {
        setSession((s) => {
          return {
            ...s,
            isAuthenticated: false,
            user: undefined,
            loading: false,
          };
        });
        console.log(res);
      });
  }, []);
  const register = (username: string, email: string, password: string): Promise<void> => {
    return auth
      .register(username, email, password)
      .then(() => user.getByUsername({ username: username }))
      .then((res) => setSession({ ...session, isAuthenticated: true, user: res }));
  };
  const login = (username: string, password: string): Promise<void> => {
    return auth
      .login(username, password)
      .then(() => user.getByUsername({ username: username }))
      .then((res) => setSession({ ...session, isAuthenticated: true, user: res }));
  };
  const logout = () => {
    return auth.logout().then(() => setSession({ ...session, isAuthenticated: false, user: undefined }));
  };
  return <SessionContext.Provider value={{ register, login, logout, session }}>{props.children}</SessionContext.Provider>;
};
export { SessionContext, useSessionContext, SessionContextProvider, initialSession };
