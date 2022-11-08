import { Avatar, Box, Typography } from "@mui/material";
import { darken, styled } from "@mui/system";
import React from "react";
import { ChatMessageVM } from "../../api/api/models/ChatMessageVM";
const NGINX_URL = process.env.REACT_APP_USER;

interface ChatMessageProps {
  isMyMessage?: boolean;
  message: ChatMessageVM;
}
export default function ChatMessage({ isMyMessage, message }: ChatMessageProps) {
  const publishDate = message.publishDate as Date;
  let hour = publishDate.getHours().toString();
  let minute = publishDate.getMinutes().toString();
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  if (minute.length < 2) {
    minute = "0" + minute;
  }

  return (
    <Box
      sx={{
        display: "flex",
        mb: 4,
        // justifyContent: isMyMessage ? "flex-end" : "flex-start",
        flexDirection: "column",
        alignItems: isMyMessage ? "flex-end" : "flex-start",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexDirection: isMyMessage ? "row-reverse" : "row",
          mb: 1,
        }}
      >
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={`${NGINX_URL}/${message.profilePicturePath}/profile.jpg`}
          alt={message.authorName}
        />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMyMessage ? "flex-end" : "flex-start" }}>
          <Typography color="secondary">{message.authorName}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>{`${hour}:${minute}`}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            md: 700,
          },
          display: "flex",
          px: {
            xs: 0,
            md: 5,
          },
        }}
      >
        {isMyMessage ? (
          <MyMessageBox>{message.message}</MyMessageBox>
        ) : (
          <OthersMessageBox>{message.message}</OthersMessageBox>
        )}
      </Box>
    </Box>
  );
}
const MessageBox = styled(Box)(({ theme }) => ({
  wordWrap: "break-word",
  width: "fit-content",
  maxWidth: "100%",
  padding: `${theme.spacing(1.2)} ${theme.spacing(2)}`,
  borderRadius: 25,
  color: theme.palette.staticText.primary,
}));
const MyMessageBox = styled(MessageBox)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
const OthersMessageBox = styled(MessageBox)(({ theme }) => ({
  backgroundColor: darken(theme.palette.primary.light, 0.4),
}));
