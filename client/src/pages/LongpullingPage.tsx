import React, { FC, useState, useEffect, MouseEvent } from 'react';

interface Props {
  name: string
};

type Message = {
  data_id: string,
  body: string
}

const LongpullingPage: FC<Props> = ({ name }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => { subscribe() }, []);

  const subscribe = async () => {
    try {
      let response = await fetch('http://localhost:5000/get-message', { method: 'GET' });
      let message = await response.json();
      console.log(message);
      setMessages(prev => [message, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(async () => {
        await subscribe();
      }, 1000);
    }
  }

  const sendMessage = async (event: MouseEvent<HTMLButtonElement>) => {
    await fetch('http://localhost:5000/new-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ message: { data_id: Date.now(), body: inputValue } })
    });
    setInputValue('');
  }

  return (
    <>
      <h2>{ name }</h2>
      <input value={inputValue} onChange={event => setInputValue(event.target.value)} type="type" />
      <button onClick={sendMessage}>Отправить</button>
      <div>
        { messages.map((message) => <p key={message.data_id}>{message.body}</p>) }
      </div>
    </>
  );
};

export default LongpullingPage;