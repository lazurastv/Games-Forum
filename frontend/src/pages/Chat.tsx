import Container from '@mui/material/Container';
import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import { ChatMessageAdd } from '../api/api/models/ChatMessageAdd';
import { ChatMessageVM } from '../api/api/models/ChatMessageVM';
import { getChatToken } from '../fetchData/fetchChat';
import withLoading from '../fetchData/withLoading';

const SOCKET_URL = 'http://localhost:8080/chat';
const RECV_PATH = '/topic/message';
const SEND_PATH = '/app/send';

const Chat = ({ token }: { token: string }) => {
  const [clientRef, setClientRef] = useState<any>();
  const [messages, setMessages] = useState<ChatMessageVM[]>([]);  // add initial loading of messages once implemented
  const [message, setMessage] = useState<string>("");

  const onConnected = () => {
    console.log("Connected!")
  }

  const onMessageReceived = (msg: ChatMessageVM) => {
    msg.publishDate = new Date(msg.publishDate);
    setMessages([...messages, msg]);
  }

  const sendMessage = () => {
    clientRef!.sendMessage(SEND_PATH, JSON.stringify({ message: message } as ChatMessageAdd));
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          messages.map(x => <p key={x.publishDate.toISOString()} style={{ color: 'black', backgroundColor: 'white' }}>{x.authorId + ": " + x.message}</p>)
        }
      </div>
    </Container>
  );
};
export default withLoading(Chat, { token: getChatToken });