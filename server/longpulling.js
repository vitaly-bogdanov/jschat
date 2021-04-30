import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import cors from 'cors';
import { EventEmitter } from 'events';

const emmiter = new EventEmitter();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', methods: '*' }));
app.use(express.json());

app.get('/get-message', (req, res) => {
  emmiter.once('newMessage', (message) => {
    res.status(200).json(message); // отправим всем пользователям у которых в данный момент висит ожидание ответа
  });
});

app.post('/new-message', (req, res) => {
  const message = req.body.message;
  emmiter.emit('newMessage', message); // вызвали собитые ответа всем пользователям, кто висел на ожидании ответа
  res.status(200).end();
});

app.listen(process.env.PORT, () => console.log(`Сервер стартовал на порту: ${process.env.PORT}`));