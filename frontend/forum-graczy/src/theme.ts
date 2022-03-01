import { createTheme } from "@mui/material";
function getTheme(themeMode: "light" | "dark") {
  return createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "light"
        ? {
            primary: { main: "#dddcf0" },
            secondary: { main: "#5e4ad7" },
            background: { default: "#edecf9" },
            popup: { main: "#e4e3f2" },
            text: { primary: "#111111", secondary: "#333333" },
            staticText: { primary: "#e7e7e7", secondary: "#afa3bd" },
          }
        : {
            primary: { main: "#120d18" },
            secondary: { main: "#c48515" },
            background: { default: "#1c1327" },
            popup: { main: "#161318" },
            text: { primary: "#e7e7e7", secondary: "#afa3bd" },
            staticText: { primary: "#e7e7e7", secondary: "#afa3bd" },
          }),
    },
  });
}

export default getTheme;
