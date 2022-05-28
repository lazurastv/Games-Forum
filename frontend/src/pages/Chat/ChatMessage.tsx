import { Box } from "@mui/material";
import { darken, styled } from "@mui/system";
import React from "react";
interface ChatMessageProps {
  isMyMessage?: boolean;
  children?: React.ReactNode;
  message?: {
    authorName: string;
    message?: string;
    profilePicturePath?:string
  };
}
export default function ChatMessage({ isMyMessage, children }: ChatMessageProps) {
  return (
    <Box>
      {isMyMessage ? <MyMessageBox>{children}</MyMessageBox> : <OthersMessageBox>{children}</OthersMessageBox>}
    </Box>
  );
}
const MessageBox = styled(Box)(({ theme }) => ({
  wordWrap: "break-word",
  width: "fit-content",
  maxWidth: "70%",
  padding: `${theme.spacing(1.2)} ${theme.spacing(2)}`,
  marginBottom:theme.spacing(1),
  borderRadius: 25,
  color: theme.palette.staticText.primary,
}));
const MyMessageBox = styled(MessageBox)(({ theme }) => ({
  marginLeft: "auto",
  backgroundColor: theme.palette.secondary.main,
}));
const OthersMessageBox = styled(MessageBox)(({ theme }) => ({
  marginRight: "auto",
  backgroundColor: darken(theme.palette.primary.light, 0.4),
}));
