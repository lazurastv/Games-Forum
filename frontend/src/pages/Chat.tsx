import Container from '@mui/material/Container';
import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import { getChatToken } from '../fetchData/fetchChat';
import withLoading from '../fetchData/withLoading';

const SOCKET_URL = 'http://localhost:8080/chat';
const RECV_PATH = '/topic/message';
const SEND_PATH = '/app/send';

const Chat = ({ token }: { token: string }) => {
  const [clientRef, setClientRef] = useState<any>();
  const [message, setMessage] = useState<string>("");

  const onConnected = () => {
    console.log("Connected!")
  }

  const onMessageReceived = (msg) => {
    console.log("I received:");
    console.log(msg);
  }

  const sendMessage = () => {
    clientRef!.sendMessage(SEND_PATH, JSON.stringify({ message: message }));
    setMessage("");
  }

  return (
    <Container maxWidth="xl">
      <SockJsClient
        url={SOCKET_URL}
        headers={{ token: token }}
        topics={[RECV_PATH]}
        onConnect={onConnected}
        // onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        ref={client => setClientRef(client)}
      />
      <input value={message} onChange={(evt) => setMessage(evt.target.value)}></input>
      <button onClick={sendMessage}>Wyślij</button>
    </Container>
  );
};
export default withLoading(Chat, { token: getChatToken });