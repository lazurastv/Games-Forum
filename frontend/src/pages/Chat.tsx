import { Button, Input } from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/chat';

const Chat = () => {
  const [clientRef, setClientRef] = useState<any>();

  const onConnected = () => {
    console.log("Connected!")
  }

  const onMessageReceived = (msg) => {
    console.log("I received:");
    console.log(msg);
  }

  const sendMessage = () => {
    clientRef!.sendMessage('/app/send', JSON.stringify({ message: Date.now() }));
  }

  return (
    <Container maxWidth="xl">
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        ref={client => setClientRef(client)}
      />
      <button onClick={sendMessage}>Wyślij</button>
    </Container>
  );
};
export default Chat;