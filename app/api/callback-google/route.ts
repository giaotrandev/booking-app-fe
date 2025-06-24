import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    const backendUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback?${queryString}`;

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
        Cookie: request.headers.get('cookie') || '',
      },
    });

    if (!backendResponse.ok) {
      throw new Error(
        `Backend responded with status ${backendResponse.status}`,
      );
    }

    const backendData = await backendResponse.json();
    if (!backendData.success) {
      throw new Error(backendData.message || 'Authentication failed');
    }

    const htmlResponse = `
      <html>
        <head>
          <script>
            try {
              window.opener.postMessage({
                success: true,
                type: 'GOOGLE_AUTH_SUCCESS',
                user: ${JSON.stringify(backendData.user)}
              }, 'http://localhost:3000');
              // setTimeout(() => {
              //   window.close();
              // }, 1000);
            } catch (e) {
              console.error('Error:', e);
              // window.close();
            }
          </script>
        </head>
        <body>
          <p>Đăng nhập thành công! Đang đóng cửa sổ...</p>
        </body>
      </html>
    `;

    const response = new NextResponse(htmlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });

    const setCookieHeader = backendResponse.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
      cookies.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
    // return NextResponse.redirect('http://localhost:3000', 302);
  } catch (error) {
    console.error('Auth callback error:', error);

    const errorHtml = `
      <html>
        <head>
          <script>
            window.opener.postMessage({
              success: false,
              type: 'GOOGLE_AUTH_ERROR',
              error: '${error instanceof Error ? error.message : 'Authentication failed'}'
            }, 'http://localhost:3000');
            window.close();
          </script>
        </head>
        <body>Authentication failed</body>
      </html>
    `;

    return new NextResponse(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
