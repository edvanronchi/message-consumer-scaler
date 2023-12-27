import { io } from 'socket.io-client';

const URL_GATEWAY_API = 'http://localhost:8090';

export const socket = io(URL_GATEWAY_API, {
    autoConnect: true,
    path: '/websocket/socket.io'
});
