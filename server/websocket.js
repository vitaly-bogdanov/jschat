import dotenv from 'dotenv'; dotenv.config();
import ws from 'ws'; const { Server } = ws;

const wss = new Server({
  port: process.env.PORT,
}, () => {
  console.log(`Server run on port ${process.env.PORT}`);
});

wss.on('connection', (ws) => {
  console.log('ok');
  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;
      case 'connection':
        broadcastMessage(message);
        break;
    }
  });
});

const broadcastMessage = (message) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
};