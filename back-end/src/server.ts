require('dotenv').config()

import express, {Request, Response, NextFunction, Express} from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

import BotokageSQL from './startupProcess/BotoKageSQL';
import BotokageConnection from './startupProcess/BotoKageMongo';

BotokageSQL;
BotokageConnection;

const app: Express = express();

const server = http.createServer(app);

const io = new Server(server);


io.on('connection', (socket: Socket) => {
    console.log('A user connected');
  
    // Listen for chat messages
    socket.on('chat message', (msg: string) => {
      io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})
