import { darken, IconButton, InputAdornment, styled, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SockJsClient from "react-stomp";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import { ChatMessageVM } from "../../api/api/models/ChatMessageVM";
import { ChatMessageAdd } from "../../api/api/models/ChatMessageAdd";
import withLoading from "../../fetchData/withLoading";
import { getChatToken } from "../../fetchData/fetchChat";
import { useSessionContext } from "../../components/Authentication/SessionContext";
const SOCKET_URL = "http://localhost:8080/chat";
const RECV_PATH = "/topic/message";
const SEND_PATH = "/app/send";

const Chat = ({ token }: { token: string }) => {
  const [clientRef, setClientRef] = useState<any>();
  const [messages, setMessages] = useState<ChatMessageVM[]>([]); // add initial loading of messages once implemented
  const [message, setMessage] = useState<string>("");
  const {
    session: { user },
  } = useSessionContext();
  const onConnected = () => {
    console.log("Connected!");
  };

  const onMessageReceived = (msg: ChatMessageVM) => {
    msg.publishDate = new Date(msg.publishDate);
    setMessages([...messages, msg]);
  };

  const sendMessage = () => {
    clientRef!.sendMessage(SEND_PATH, JSON.stringify({ message: message } as ChatMessageAdd));
    setMessage("");
  };

  // it must be handled with form if we want message to be sent on enter
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <SockJsClient
        url={SOCKET_URL}
        headers={{ token: token }}
        topics={[RECV_PATH]}
        onConnect={onConnected}
        // onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        ref={(client) => setClientRef(client)}
      />
      <ChatMessagesBox sx={{ mb: 4 }}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} isMyMessage={msg.authorId === user?.id}>
            {msg.message}
          </ChatMessage>
        ))}
      </ChatMessagesBox>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSendMessage}>
        <MessageTextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          required
          placeholder="Aa"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="send message" type="submit">
                  <SendIcon color="secondary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
};
export default withLoading(Chat, { token: getChatToken });
const ChatMessagesBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "70vh",
  borderRadius: 5,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
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
