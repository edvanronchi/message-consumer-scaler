const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"]
    }
});

io.on('connection', (socket) => {
    console.log('A client has connected');

    socket.on('terminal-socket', (message) => {
        console.log('Client message:', message);
        io.emit('terminal-socket', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`The Socket.io server is listening on the port ${PORT}`);
});
