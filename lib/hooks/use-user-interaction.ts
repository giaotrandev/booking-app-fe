'use client';
import { useState, useEffect } from 'react';

const useUserInteraction = (): boolean => {
  const [isInteracted, setIsInteracted] = useState<boolean>(false);
  useEffect(() => {
    const handleInteraction = () => setIsInteracted(true);
    const events = [
      'mousedown',
      'keydown',
      'mousemove',
      'touchstart',
      'touchend',
      'touchmove',
    ];
    events.forEach(event => {
      window.addEventListener(event, handleInteraction);
    });
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, []);
  return isInteracted;
};

export { useUserInteraction };
