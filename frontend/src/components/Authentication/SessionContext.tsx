import { createContext, useContext, useEffect, useState } from "react";
import { UserControllerApi, UserVM } from "../../api/api";
import { AuthApi } from "../../api/api/apis/AuthApi";
import Cookies from "js-cookie";

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
  login: (email: string, password: string) => Promise<void>;
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
  const login = (email: string, password: string): Promise<void> => {
    return auth
      .login()
      .then(() => user.getByEmail({ email: email }))
      .then((res) => setSession({ ...session, isAuthenticated: true, user: res }));
  };
  const logout = () => {
    return auth.logout().then(() => setSession({ ...session, isAuthenticated: false, user: undefined }));
  };
  return <SessionContext.Provider value={{ login, logout, session }}>{props.children}</SessionContext.Provider>;
};
export { SessionContext, useSessionContext, SessionContextProvider, initialSession };
