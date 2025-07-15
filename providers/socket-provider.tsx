// components/providers/socket-provider.tsx
'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext<{
  socket: any;
}>({
  socket: null,
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);

  const SOCKET_URL = 'https://booking-app-s5m3.onrender.com';

  useEffect(() => {
    const newSocket = io(`${SOCKET_URL}`, {
      path: '/socket.io',
      transports: ['websocket'],
    });
    newSocket.connect();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // chỉ gọi hàm chứ không return nó
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
