// lib/actions/verifyEmail.ts
export async function verifyEmailToken(token: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(
      'https://m9tg7r6k-5000.asse.devtunnels.ms/api/verify-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
        cache: 'no-store',
      },
    );

    if (!res.ok) throw new Error('Invalid token');

    return {
      success: true,
      message: 'Your email has been verified successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'The verification link is invalid or has expired.',
    };
  }
}
