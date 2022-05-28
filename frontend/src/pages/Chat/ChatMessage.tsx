import { Box } from "@mui/material";
import { darken, styled } from "@mui/system";
import React from "react";
interface ChatMessageProps {
  user: "me" | "other";
  children?: React.ReactNode;
}
export default function ChatMessage({ user, children }: ChatMessageProps) {
  return (
    <div>
      {user === "me" ? <MyMessageBox>{children}</MyMessageBox> : <OthersMessageBox>{children}</OthersMessageBox>}
    </div>
  );
}
const MessageBox = styled(Box)(({ theme }) => ({
  wordWrap: "break-word",
  width: "fit-content",
  maxWidth: 500,
  padding: `${theme.spacing(1.2)} ${theme.spacing(2)}`,
  borderRadius: 25,
}));
const MyMessageBox = styled(MessageBox)(({ theme }) => ({
  marginLeft: "auto",
  backgroundColor: theme.palette.secondary.main,
}));
const OthersMessageBox = styled(MessageBox)(({ theme }) => ({
  marginRight: "auto",
  backgroundColor: darken(theme.palette.primary.light, 0.3),
}));
