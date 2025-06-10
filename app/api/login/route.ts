// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  cloudflareTurnstileSiteVerify,
  cloudflareTurnstileSiteVerifyErrorMessages,
} from '#/lib/cloudflare/turnstile/site-verify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, ...formData } = body; // Extract token from form data

    // Validate Cloudflare Turnstile token
    const verify = await cloudflareTurnstileSiteVerify(token);
    if (!verify || !verify.success) {
      const errorMessages = cloudflareTurnstileSiteVerifyErrorMessages(
        verify['error-codes'],
      );
      return NextResponse.json(
        {
          success: false,
          message: errorMessages || 'Turnstile verification failed',
        },
        { status: 400 },
      );
    }

    // Forward the request to the backend
    const res = await fetch(
      'https://booking-app-s5m3.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      },
    );

    const data = await res.json();

    const response = NextResponse.json(data, { status: res.status });

    if (!res.ok) {
      return response;
    }

    const setCookieHeader = res.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
      cookies.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        data: null,
      },
      { status: 500 },
    );
  }
}

// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const res = await fetch(
//       'https://booking-app-s5m3.onrender.com/api/auth/login',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       },
//     );

//     const data = await res.json();

//     const response = NextResponse.json(data, { status: res.status });

//     if (!response.ok) {
//       return response;
//     }

//     const setCookieHeader = res.headers.get('set-cookie');
//     if (setCookieHeader) {
//       const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
//       cookies.forEach(cookie => {
//         response.headers.append('Set-Cookie', cookie);
//       });
//     }

//     return response;
//     // return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     console.log('Lỗi: ', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Internal server error',
//         data: null,
//       },
//       { status: 500 },
//     );
//   }
// }
