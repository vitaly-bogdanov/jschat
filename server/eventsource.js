import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import cors from 'cors';
import { EventEmitter } from 'events';

const emmiter = new EventEmitter();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', methods: '*' }));
app.use(express.json());

app.get('/connect', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });
  emmiter.on('newMessage', (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`);
  });
});

app.post('/new-message', (req, res) => {
  const message = req.body.message;
  emmiter.emit('newMessage', message); // вызвали собитые ответа всем пользователям, кто висел на ожидании ответа
  res.status(200).end();
});

app.listen(process.env.PORT, () => console.log(`Сервер стартовал на порту: ${process.env.PORT}`));