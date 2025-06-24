export async function loginHandler(data: Record<string, any>) {
  try {
    const res = await fetch(
      'https://booking-app-s5m3.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Login failed',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('LoginHandler Error:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
}
