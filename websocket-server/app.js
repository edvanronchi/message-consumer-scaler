const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 4000;

io.on('connection', (socket) => {
    console.log('A client has connected');

    socket.on('terminal-socket', (message) => {
        console.log('Client message: terminal-socket:', message);
        io.emit('terminal-socket', message);
    });

    socket.on('metric-consumer-perfomance-socket', (message) => {
        console.log('Client message: metric-consumer-perfomance-socket:', message);
        io.emit('metric-consumer-perfomance-socket', message);
    });

    socket.on('metric-socket', (message) => {
        console.log('Client message: metric-socket:', message);
        io.emit('metric-socket', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`The Socket.io server is listening on the port ${PORT}`);
});
