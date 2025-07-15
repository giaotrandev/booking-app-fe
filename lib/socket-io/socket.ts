// lib/socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://booking-app-s5m3.onrender.com';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(`${SOCKET_URL}`, {
      path: '/socket.io',
      transports: ['websocket'],
    });
  }
  return socket;
};
