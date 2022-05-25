import React from "react";
import { styled } from "@mui/system";

export default function StyledEditorContent({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
const StyledDiv = styled("div")(({ theme }) => ({
  h1: {
    ...(theme.typography as { [key: string]: Object }).h1,
    // color: theme.palette.secondary.main,
  },
  h2: {
    ...(theme.typography as { [key: string]: Object }).h2,
  },
  h3: {
    ...(theme.typography as { [key: string]: Object }).h3,
  },
  h4: {
    ...(theme.typography as { [key: string]: Object }).h4,
  },
  h5: {
    ...(theme.typography as { [key: string]: Object }).h5,
  },
  h6: {
    ...(theme.typography as { [key: string]: Object }).h6,
  },
  p: {
    ...(theme.typography as { [key: string]: Object }).body1,
  },
  ".rdw-editor-main blockquote, blockquote": {
    ...(theme.typography as { [key: string]: Object }).h5,
    color: theme.palette.secondary.light,
    borderLeft: "5px solid",
    borderColor: theme.palette.secondary.light,
    paddingLeft: "2rem",
  },
  img: {
    maxWidth: "100%",
  },
}));
