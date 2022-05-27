import { Button, Input } from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/chat';

const Chat = () => {
  const [clientRef, setClientRef] = useState<any>();
  const [chatKey, setChatKey] = useState<string>();

  if (!chatKey) {
    fetch('http://localhost:8080/api/chat/key', { credentials: 'include' }).then(x => x.text()).then(
      x => {
        console.log(x);
        setChatKey(x);
      }
    );
  }

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
      {
        chatKey &&
        <div>
          <SockJsClient
            url={SOCKET_URL}
            headers={{ "key": chatKey }}
            topics={['/topic/message']}
            onConnect={onConnected}
            onDisconnect={console.log("Disconnected!")}
            onMessage={msg => onMessageReceived(msg)}
            ref={client => setClientRef(client)}
          />
          <button onClick={sendMessage}>Wyślij</button>
        </div>
      }

    </Container>
  );
};
export default Chat;