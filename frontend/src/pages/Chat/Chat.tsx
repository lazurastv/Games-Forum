import { darken, IconButton, InputAdornment, styled, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SockJsClient from "react-stomp";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
const SOCKET_URL = "http://localhost:8080/chat";

const Chat = () => {
  const [clientRef, setClientRef] = useState<any>();
  const [chatKey, setChatKey] = useState<string>();
  const [sendMessageValue, setSendMessageValue] = useState<string>("");
  if (!chatKey) {
    fetch("http://localhost:8080/api/chat/key", { credentials: "include" })
      .then((x) => x.text())
      .then((x) => {
        console.log(x);
        setChatKey(x);
      });
  }

  const onConnected = () => {
    console.log("Connected!");
  };

  const onMessageReceived = (msg) => {
    console.log("I received:");
    console.log(msg);
  };

  const sendMessage = () => {
    clientRef!.sendMessage("/app/send", JSON.stringify({ message: Date.now() }));
  };
  // it must be handled with form if we want message to be sent on enter
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
    setSendMessageValue("");
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {chatKey && (
        <>
          <SockJsClient
            url={SOCKET_URL}
            headers={{ key: chatKey }}
            topics={["/topic/message"]}
            onConnect={onConnected}
            onDisconnect={console.log("Disconnected!")}
            onMessage={(msg) => onMessageReceived(msg)}
            ref={(client) => setClientRef(client)}
          />
          <ChatMessagesBox sx={{ mb: 4 }}>
            {Array(100)
              .fill([
                <ChatMessage user="me">dassdada</ChatMessage>,
                <ChatMessage user="other">
                  fgvdvtgvartgvagvvragvrtgdsadasadfgaertvawtvgrdsasdadadfd,
                  dsadasadfgaertvawtvgrdsasdadadfddsadasadfgaertvawtvgrdsasdadadfddsada.
                  sadfgaertvawtvgrdsasdadadfddsadasadfgaertvawtvgrdsasdadadfddsadasadfgaertvawtvgrdsasdadadfd.
                </ChatMessage>,
              ])
              .map((msg) => msg)}
          </ChatMessagesBox>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSendMessage}>
            <MessageTextField
              value={sendMessageValue}
              onChange={(e) => setSendMessageValue(e.target.value)}
              fullWidth
              required
              placeholder="Aa"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" type="submit">
                      <SendIcon color="secondary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};
export default Chat;
const ChatMessagesBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  maxHeight: "70vh",
  borderRadius: 5,
  padding: `0 ${theme.spacing(4)}`,
  overflowY: "scroll",
}));
const MessageTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: "block",
  "& .MuiOutlinedInput-root": {
    paddingLeft: theme.spacing(2),
    borderRadius: theme.spacing(10),
    backgroundColor: darken(theme.palette.primary.light, 0.2),
    transition: "background-color 0.3s ease",
    "&.Mui-focused": {
      backgroundColor: theme.palette.primary.light,
    },
    fieldset: {
      border: 0,
    },
  },
}));
