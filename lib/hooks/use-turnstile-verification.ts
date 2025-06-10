// lib/hooks/use-turnstile-verification.ts
'use client';

import { useRef, useState } from 'react';
import { BoundTurnstileObject } from '#/lib/cloudflare/turnstile/widget';

export function useTurnstileVerification() {
  const [token, setToken] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<BoundTurnstileObject | null>(null);

  const handleVerify = (
    newToken: string,
    boundTurnstile: BoundTurnstileObject,
  ) => {
    setToken(newToken);
    setCanSubmit(true);
    setLoading(false);
    turnstileRef.current = boundTurnstile;
  };

  const handleLoad = (
    _widgetId: string,
    boundTurnstile: BoundTurnstileObject,
  ) => {
    setLoading(false);
    turnstileRef.current = boundTurnstile;
  };

  const handleExpire = () => {
    setToken('');
    setCanSubmit(false);
  };

  const handleError = () => {
    setToken('');
    setCanSubmit(false);
    setLoading(false);
  };

  const reset = () => {
    turnstileRef.current?.reset();
    setToken('');
    setCanSubmit(false);
  };

  return {
    token,
    canSubmit,
    loading,
    setLoading,
    handleVerify,
    handleLoad,
    handleExpire,
    handleError,
    reset,
    turnstileRef,
  };
}
