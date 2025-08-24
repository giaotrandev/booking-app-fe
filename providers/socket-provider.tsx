'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const SOCKET_URL = 'https://booking-app-s5m3.onrender.com';

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io(SOCKET_URL, {
        path: '/socket.io',
        transports: ['websocket'],
        reconnection: true, // Bật tự động reconnect
        reconnectionAttempts: 5, // Số lần thử reconnect
        reconnectionDelay: 1000, // Thời gian chờ giữa các lần reconnect
      });

      socketRef.current = newSocket;

      // Xử lý sự kiện kết nối
      newSocket.on('connect', () => {
        setSocket(newSocket);
      });

      // Xử lý sự kiện ngắt kết nối
      newSocket.on('disconnect', () => {
        setSocket(null);
      });

      // Xử lý lỗi kết nối
      newSocket.on('connect_error', error => {
        console.error('Socket connection error:', error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
