import React from 'react';
import socketIOClient from 'socket.io-client';
const clientBackendUrl = process.env.REACT_APP_CLIENT_BACKEND_URL;

// server side socket io connection.
// const END_POINT = REACT_APP_CLIENT_BACKEND_URL;
// web socket
export const socket = socketIOClient(clientBackendUrl, {
   transports: ['websocket'],
});

// socket context
export const SocketContext = React.createContext();
