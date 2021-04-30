import React, { FC, useState, MouseEvent, useRef } from 'react';

interface Props {
  name: string
}

type Message = {
  date_id: number,
  body: string,
  event: string,
  user: string
}

const WebsocketPage: FC<Props> = ({ name }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [connection, setConnection] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const socket = useRef<WebSocket>();

  const connect = (event: MouseEvent<HTMLButtonElement>) => {
    socket.current = new WebSocket('ws://localhost:5000');
    socket.current.onopen = () => {
      const message: Message = {
        event: 'connection',
        user: username,
        date_id: Date.now(),
        body: ''
      };
      socket.current?.send(JSON.stringify(message));
      setConnection(true);
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log('Подключение закрыто');
      setConnection(false);
    };
    socket.current.onerror = () => {
      console.log('Ошибка');
      setConnection(false);
    };
  }

  const sendMessage = async () => {
    const message = {
      event: 'message',
      user: username,
      data_id: Date.now(),
      body: inputValue
    };
    socket.current?.send(JSON.stringify(message));
    setInputValue('');
  };

  if (!connection) {
    return (
      <>
        <h2>Войдите</h2>
        <input 
          value={username}
          onChange={event => setUsername(event.target.value)}
          type="text"
          placeholder="Введите ваше имя"
        />
        <button onClick={connect}>Войти</button>
      </>
    );
  }

  return (
    <>
      <h2>{ name }</h2>
      <input 
        value={inputValue}
        type='text'
        onChange={event => setInputValue(event.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={sendMessage}>Отправить</button>
      {
        messages.map((message) => (
          <p>{ message.event === 'connection' ? `Пользователь ${message.user} подключился` : message.body }</p>
        ))
      }
    </>
  );
};

export default WebsocketPage;