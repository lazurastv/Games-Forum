import Cookies from "js-cookie";
export const DATA_COOKIE = "userData";
export const setSessionCookie = (session: any): void => {
  Cookies.remove("userData");
  Cookies.set("userData", JSON.stringify(session), { expires: 14 });
};

export const getSessionCookie: any = (name: string) => {
  const sessionCookie = Cookies.get(name);
  if (sessionCookie === undefined) {
    return undefined;
  } else {
    return JSON.parse(sessionCookie);
  }
};
